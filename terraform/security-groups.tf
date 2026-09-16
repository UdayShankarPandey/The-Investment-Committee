# ==============================================================================
# SECURITY GROUPS (Strict least-privilege; zero 0.0.0.0/0 SSH)
# ==============================================================================

# EKS Cluster Control Plane Security Group
resource "aws_security_group" "eks_cluster" {
  name        = "${local.name_prefix}-eks-cluster-sg"
  description = "Security group for EKS control plane communication"
  vpc_id      = aws_vpc.this.id

  # Allow all outbound traffic from control plane
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-eks-cluster-sg"
    }
  )
}

# EKS Managed Node Group Security Group
resource "aws_security_group" "eks_nodes" {
  name        = "${local.name_prefix}-eks-nodes-sg"
  description = "Security group for EKS worker nodes communication"
  vpc_id      = aws_vpc.this.id

  # Intra-node communication
  ingress {
    description = "Allow intra-node group communication"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = true
  }

  # Ingress from control plane to worker nodes (kubelet, webhook)
  ingress {
    description     = "Allow HTTPS/webhook from EKS control plane"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_cluster.id]
  }

  ingress {
    description     = "Allow Kubelet API from EKS control plane"
    from_port       = 10250
    to_port         = 10250
    protocol        = "tcp"
    security_groups = [aws_security_group.eks_cluster.id]
  }

  # Allow nodes full egress for image pulls and package updates
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    local.common_tags,
    local.eks_shared_tag,
    {
      Name = "${local.name_prefix}-eks-nodes-sg"
    }
  )
}

# Control plane ingress from worker nodes
resource "aws_security_group_rule" "cluster_ingress_node_https" {
  description              = "Allow HTTPS from worker nodes to control plane"
  type                     = "ingress"
  from_port                = 443
  to_port                  = 443
  protocol                 = "tcp"
  security_group_id        = aws_security_group.eks_cluster.id
  source_security_group_id = aws_security_group.eks_nodes.id
}

# Application Container Services Security Group
resource "aws_security_group" "app" {
  name        = "${local.name_prefix}-app-sg"
  description = "Security group for containerized application services"
  vpc_id      = aws_vpc.this.id

  # Ingress restricted to VPC CIDR or cluster nodes (no unrestricted SSH)
  ingress {
    description = "Allow HTTP frontend traffic within VPC"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    description = "Allow backend API traffic within VPC"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-app-sg"
    }
  )
}
