variable "aws_region" {
  description = "The AWS region where infrastructure resources are provisioned."
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "The project name used for resource naming and tagging."
  type        = string
  default     = "the-investment-committee"
}

variable "environment" {
  description = "Deployment environment name (e.g., production, staging, dev)."
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR block for the dedicated project VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of Availability Zones in the chosen AWS region."
  type        = list(string)
  default     = ["ap-south-1a", "ap-south-1b"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (one per AZ)."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (one per AZ)."
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24"]
}

# ==============================================================================
# COST CONTROL SWITCHES (CRITICAL: Preserves strict budget limits)
# ==============================================================================

variable "enable_eks" {
  description = "Control switch to provision Amazon EKS cluster and managed node group. Default false preserves budget; enabled only in Sprint 5."
  type        = bool
  default     = false
}

variable "enable_nat_gateway" {
  description = "Control switch to create a NAT Gateway in the public subnet for private subnet internet egress. Default false prevents recurring ~$32.40/mo charges."
  type        = bool
  default     = false
}

variable "enable_load_balancer" {
  description = "Control switch to provision an Application Load Balancer. Default false avoids hourly ELB charges."
  type        = bool
  default     = false
}

variable "manage_ecr" {
  description = "Whether Terraform actively manages (creates/imports) the ECR repository rather than reading it as an existing data source."
  type        = bool
  default     = false
}

variable "manage_iam_role" {
  description = "Whether Terraform actively manages (creates/imports) the GitHub Actions IAM role rather than reading it as an existing data source."
  type        = bool
  default     = false
}

# ==============================================================================
# EKS CONFIGURATION (Deferred to Sprint 5 runtime verification)
# ==============================================================================

variable "eks_cluster_name" {
  description = "Custom name for the EKS cluster. If left empty, defaults to '<project_name>-cluster'."
  type        = string
  default     = ""
}

variable "eks_cluster_version" {
  description = "Kubernetes control plane version for Amazon EKS."
  type        = string
  default     = "1.31"
}

variable "eks_node_instance_types" {
  description = "EC2 instance types for EKS managed node group. Kept small (t3.small) for academic cost-efficiency."
  type        = list(string)
  default     = ["t3.small"]
}

variable "eks_desired_size" {
  description = "Desired number of worker nodes when EKS is enabled."
  type        = number
  default     = 1
}

variable "eks_min_size" {
  description = "Minimum number of worker nodes when EKS is enabled."
  type        = number
  default     = 1
}

variable "eks_max_size" {
  description = "Maximum number of worker nodes when EKS is enabled."
  type        = number
  default     = 2
}

variable "github_repository" {
  description = "Target GitHub repository in 'owner/repo' format for OIDC trust."
  type        = string
  default     = "UdayShankarPandey/The-Investment-Committee"
}
