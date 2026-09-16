# ==============================================================================
# TERRAFORM OUTPUTS
# Safe outputs that do not fail when conditional resources (EKS) are disabled.
# Zero secrets or credentials exposed.
# ==============================================================================

output "vpc_id" {
  description = "The ID of the dedicated project VPC"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "ecr_repository_url" {
  description = "The URL of the Amazon ECR container repository"
  value       = local.ecr_repository_url
}

output "ecr_repository_arn" {
  description = "The ARN of the Amazon ECR container repository"
  value       = local.ecr_repository_arn
}

output "github_actions_role_arn" {
  description = "The ARN of the GitHub Actions OIDC publishing IAM role"
  value       = local.github_actions_role_arn
}

output "eks_cluster_name" {
  description = "Name of the Amazon EKS cluster (null when enable_eks = false)"
  value       = var.enable_eks ? aws_eks_cluster.this[0].name : null
}

output "eks_cluster_arn" {
  description = "ARN of the Amazon EKS cluster (null when enable_eks = false)"
  value       = var.enable_eks ? aws_eks_cluster.this[0].arn : null
}

output "eks_cluster_endpoint" {
  description = "Kubernetes API server endpoint for Amazon EKS (null when enable_eks = false)"
  value       = var.enable_eks ? aws_eks_cluster.this[0].endpoint : null
}
