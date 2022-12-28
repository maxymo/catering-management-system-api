module "cms_queue" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "~> 2.0"

  name = "stg-cms-queue"

  tags = {
    Product = "Catering Management System"
    Environment = "Staging"
  }
}
