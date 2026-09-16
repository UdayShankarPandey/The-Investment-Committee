# ==============================================================================
# ECR REPOSITORY INTEGRATION (Safe integration with Sprint 3 ECR repository)
# By default, reads existing repository via data source to prevent any destructive action.
# If manage_ecr = true, defines resource with prevent_destroy = true for safe import.
# ==============================================================================

resource "aws_ecr_repository" "this" {
  count                = var.manage_ecr ? 1 : 0
  name                 = "the-investment-committee"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  lifecycle {
    prevent_destroy = true
  }

  tags = merge(
    local.common_tags,
    {
      Name = "the-investment-committee"
    }
  )
}

locals {
  ecr_repository_arn = var.manage_ecr ? aws_ecr_repository.this[0].arn : data.aws_ecr_repository.existing[0].arn
  ecr_repository_url = var.manage_ecr ? aws_ecr_repository.this[0].repository_url : data.aws_ecr_repository.existing[0].repository_url
}
