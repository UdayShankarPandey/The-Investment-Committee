provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "The-Investment-Committee"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
