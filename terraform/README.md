# Infrastructure as Code — The Investment Committee (Sprint 4)

This directory contains the production-grade Terraform configurations for **The Investment Committee** cloud infrastructure on Amazon Web Services (AWS).

> [!IMPORTANT]
> **Sprint Boundary & Budget Safeguard:**  
> **Sprint 4 defines the complete infrastructure topology as code.**  
> Due to strict project budget constraints (~$35 credit remaining), expensive recurring infrastructure—specifically the **Amazon EKS cluster**, **worker EC2 nodes**, **NAT Gateways**, and **Application Load Balancers**—are **strictly disabled by default** (`enable_eks = false`, `enable_nat_gateway = false`, `enable_load_balancer = false`).  
> **Sprint 5 performs the actual runtime EKS cluster creation and Kubernetes deployment.**

---

## Directory Layout

```text
terraform/
├── versions.tf               # Terraform core and AWS provider version pinning
├── providers.tf              # AWS provider configuration and standard tags
├── variables.tf              # Input variables, descriptions, and cost-control switches
├── locals.tf                 # Standard resource naming and Kubernetes cluster tags
├── data.tf                   # References existing ECR repository and GitHub Actions IAM role
├── vpc.tf                    # VPC, 2-AZ public & private subnets, IGW, route tables
├── security-groups.tf        # Least-privilege SGs (EKS control plane, nodes, app)
├── ecr.tf                    # Safe, non-destructive ECR repository integration
├── iam.tf                    # EKS cluster and worker node IAM roles (conditional)
├── eks.tf                    # Amazon EKS cluster and managed node group (conditional)
├── outputs.tf                # VPC, subnet, ECR, and conditional EKS outputs
├── terraform.tfvars.example  # Safe variable template with zero secrets
└── README.md                 # Technical architecture and operational documentation
```

---

## Architecture Design

### 1. Networking & VPC (`vpc.tf`)
- **VPC CIDR:** `10.0.0.0/16` in region `ap-south-1`.
- **Availability Zones:** 2 AZs (`ap-south-1a`, `ap-south-1b`) ensuring high-availability and satisfying AWS EKS control-plane subnet requirements.
- **Public Subnets:** `10.0.1.0/24`, `10.0.2.0/24` with internet gateway routing. Tagged with `kubernetes.io/role/elb = 1`.
- **Private Subnets:** `10.0.10.0/24`, `10.0.11.0/24` dedicated for containerized worker nodes. Tagged with `kubernetes.io/role/internal-elb = 1`.
- **NAT Gateway:** Disabled by default (`enable_nat_gateway = false`) to eliminate ~$32.40/month recurring hourly costs. Standard VPCs and subnets incur $0 recurring hourly charge.

### 2. Security Groups (`security-groups.tf`)
- Strict least privilege.
- Zero open SSH (`0.0.0.0/0:22`) rules.
- Scoped ingress for EKS control plane, worker nodes, and containerized microservices (`8080`, `3000`).

### 3. Registry Integration (`ecr.tf`)
- Protects the existing Amazon ECR repository `the-investment-committee` created in Sprint 3.
- By default, reads existing repository metadata via `data.aws_ecr_repository.existing` to prevent any accidental recreation or destruction of the live production image (`6bbb29f26e16928ad091c556af67f9c363d58c2c`).
- If `manage_ecr = true` is set for state import, `lifecycle { prevent_destroy = true }` guarantees repository retention.

### 4. Identity & Access Management (`iam.tf`)
- Protects the existing GitHub Actions OIDC role `TheInvestmentCommittee-GitHubActions-ECR`.
- Preserves the verified immutable trust condition:  
  `repo:UdayShankarPandey@149937590/The-Investment-Committee@1338626622:ref:refs/heads/main`
- Provisions EKS cluster role (`AmazonEKSClusterPolicy`) and worker node role (`AmazonEKSWorkerNodePolicy`, `AmazonEKS_CNI_Policy`, `AmazonEC2ContainerRegistryReadOnly`) conditionally when `enable_eks = true`.

### 5. Amazon EKS Cluster & Node Group (`eks.tf`)
- Full architectural representation of Amazon EKS 1.31 with managed node groups.
- Scaled for cost efficiency: `t3.small` nodes, `desired_size = 1`, `min_size = 1`, `max_size = 2`.
- Completely deactivated in Sprint 4 via `count = var.enable_eks ? 1 : 0` to preserve the remaining budget.

---

## State Management

For academic development, local state (`terraform.tfstate`) is utilized by default to avoid provisioning billable remote S3 buckets and DynamoDB locking tables. Remote state locking can be enabled in production environments without architectural changes.

---

## Usage Commands

```bash
# 1. Format all configuration files
terraform fmt -recursive

# 2. Initialize provider plugins and lockfile
terraform init

# 3. Validate syntax and provider schemas
terraform validate

# 4. Generate speculative execution plan (Cost-safe Sprint 4 gate)
terraform plan

# 5. Apply (Only for zero/low-cost foundation if approved)
# NOTE: Do NOT apply expensive resources in Sprint 4
terraform apply

# 6. Destroy infrastructure when testing completes
terraform destroy
```

---

## Cost Controls & Sprint 5 Roadmap

| Resource | Sprint 4 State | Sprint 5 Target | Monthly Cost Impact |
| :--- | :---: | :---: | :--- |
| **VPC & Subnets** | Defined / Modeled | Deployed | $0.00 / month |
| **Internet Gateway** | Defined / Modeled | Deployed | $0.00 / month |
| **Security Groups** | Defined / Modeled | Deployed | $0.00 / month |
| **ECR Repository** | Existing (Data Source) | Existing (Data Source) | ~$0.05 / month (storage) |
| **NAT Gateway** | Disabled (`false`) | Optional (`false`/`true`) | ~$32.40 / month (deferred) |
| **EKS Control Plane** | Disabled (`false`) | Enabled (`true`) | ~$72.00 / month ($0.10/hr) |
| **EKS Worker Node (`t3.small`)** | Disabled (`false`) | Enabled (`true`) | ~$15.00 / month ($0.0208/hr) |
| **Application Load Balancer** | Disabled (`false`) | Optional (`false`/`true`) | ~$16.20 / month (deferred) |
