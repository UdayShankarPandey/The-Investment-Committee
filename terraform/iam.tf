# ==============================================================================
# IAM CONFIGURATION
# Protects Sprint 3 GitHub Actions role and provides conditional EKS roles.
# ==============================================================================

# ------------------------------------------------------------------------------
# GitHub Actions ECR Publishing Role (Preserves Sprint 3 OIDC Federation)
# ------------------------------------------------------------------------------

data "aws_iam_policy_document" "github_actions_trust" {
  statement {
    sid     = "AllowGitHubActionsImmutableOIDC"
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:UdayShankarPandey@149937590/The-Investment-Committee@1338626622:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  count              = var.manage_iam_role ? 1 : 0
  name               = "TheInvestmentCommittee-GitHubActions-ECR"
  assume_role_policy = data.aws_iam_policy_document.github_actions_trust.json
  description        = "Least-privilege role for GitHub Actions to publish Docker images to ECR via immutable OIDC"

  tags = local.common_tags
}

locals {
  github_actions_role_arn = var.manage_iam_role ? aws_iam_role.github_actions[0].arn : data.aws_iam_role.existing_github_actions[0].arn
}

# ------------------------------------------------------------------------------
# EKS Cluster IAM Role (Conditional: Provisioned only when enable_eks = true)
# ------------------------------------------------------------------------------

data "aws_iam_policy_document" "eks_cluster_trust" {
  count = var.enable_eks ? 1 : 0

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eks_cluster" {
  count              = var.enable_eks ? 1 : 0
  name               = "${local.name_prefix}-eks-cluster-role"
  assume_role_policy = data.aws_iam_policy_document.eks_cluster_trust[0].json

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  count      = var.enable_eks ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_cluster[0].name
}

# ------------------------------------------------------------------------------
# EKS Worker Node Group IAM Role (Conditional: Provisioned only when enable_eks = true)
# ------------------------------------------------------------------------------

data "aws_iam_policy_document" "eks_node_trust" {
  count = var.enable_eks ? 1 : 0

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eks_node" {
  count              = var.enable_eks ? 1 : 0
  name               = "${local.name_prefix}-eks-node-role"
  assume_role_policy = data.aws_iam_policy_document.eks_node_trust[0].json

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  count      = var.enable_eks ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_node[0].name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  count      = var.enable_eks ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_node[0].name
}

resource "aws_iam_role_policy_attachment" "eks_ecr_read_only" {
  count      = var.enable_eks ? 1 : 0
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_node[0].name
}
