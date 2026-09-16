locals {
  name_prefix  = "${var.project_name}-${var.environment}"
  cluster_name = var.eks_cluster_name != "" ? var.eks_cluster_name : "${var.project_name}-cluster"

  # Standard tags applied across all resources
  common_tags = {
    Project     = "The-Investment-Committee"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }

  # Tags required by Kubernetes AWS Cloud Controller for subnet auto-discovery
  eks_shared_tag = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
  }
}
