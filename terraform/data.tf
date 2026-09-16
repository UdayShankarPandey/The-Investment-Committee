data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# Read existing ECR repository created in Sprint 3 without recreation
data "aws_ecr_repository" "existing" {
  count = var.manage_ecr ? 0 : 1
  name  = "the-investment-committee"
}

# Read existing GitHub Actions IAM role created in Sprint 3 without recreation
data "aws_iam_role" "existing_github_actions" {
  count = var.manage_iam_role ? 0 : 1
  name  = "TheInvestmentCommittee-GitHubActions-ECR"
}
