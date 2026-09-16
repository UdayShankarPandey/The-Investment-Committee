# ==============================================================================
# EKS ARCHITECTURE (DEFERRED TO SPRINT 5 — STRICT BUDGET CONTROL)
# These resources are intentionally not created during Sprint 4 because Amazon EKS
# incurs ongoing control-plane ($0.10/hr) and worker EC2 charges.
# Provisioning is conditioned on var.enable_eks (default: false).
# ==============================================================================

resource "aws_eks_cluster" "this" {
  count    = var.enable_eks ? 1 : 0
  name     = local.cluster_name
  role_arn = aws_iam_role.eks_cluster[0].arn
  version  = var.eks_cluster_version

  vpc_config {
    subnet_ids              = concat(aws_subnet.public[*].id, aws_subnet.private[*].id)
    security_group_ids      = [aws_security_group.eks_cluster.id]
    endpoint_private_access = true
    endpoint_public_access  = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy
  ]

  tags = merge(
    local.common_tags,
    {
      Name = local.cluster_name
    }
  )
}

resource "aws_eks_node_group" "this" {
  count           = var.enable_eks ? 1 : 0
  cluster_name    = aws_eks_cluster.this[0].name
  node_group_name = "${local.name_prefix}-ng"
  node_role_arn   = aws_iam_role.eks_node[0].arn
  subnet_ids      = aws_subnet.private[*].id

  instance_types = var.eks_node_instance_types

  scaling_config {
    desired_size = var.eks_desired_size
    min_size     = var.eks_min_size
    max_size     = var.eks_max_size
  }

  update_config {
    max_unavailable = 1
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.eks_ecr_read_only
  ]

  tags = merge(
    local.common_tags,
    local.eks_shared_tag,
    {
      Name = "${local.name_prefix}-ng"
    }
  )
}
