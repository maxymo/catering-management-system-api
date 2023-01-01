terraform {
  cloud {
      organization = "blackhive"

      workspaces {
        name = "catering-management-system-api"
      }
    }

    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 4.47.0"
      }
      tfe = {
        version = "~> 0.38.0"
      }
    }

    required_version = ">= 1.1.0"
}

provider "aws" {
  region = "eu-west-1"
}

provider "tfe" {
  token = "6PhH2apXdhez8g.atlasv1.sirPDUbJlDZk3XTnel8REmUxSf7MxJ5NL4zG64fYznm6RBa3huXSD7FWpSVtgJ8jOl0"
}
