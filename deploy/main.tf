terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0.0"
    }
  }
  backend "s3" {
    bucket         = "ezzton-frontend-state" # change to name of your bucket
    region         = "us-east-1"             # change to your region
    key            = "ezzton.tfstate"
    encrypt        = true
    dynamodb_table = "ezzton-frontend-tf-state-lock"
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Name        = "${var.prefix}-${terraform.workspace}-bastion"
    Environment = terraform.workspace
    Project     = var.project
    Owner       = var.contact
    ManagedBy   = "Terraform"
  }
}

// gives us info about the current region we are applying Terraform from. 
data "aws_region" "current" {}

// later create secrets for each workspace
data "aws_secretsmanager_secret" "ezzton_secrets" {
  name = "ezzton_secrets"
}

data "aws_secretsmanager_secret_version" "secret_credentials" {
  secret_id = data.aws_secretsmanager_secret.ezzton_secrets.id
}

data "aws_s3_bucket" "web_s3_bucket" {
  bucket = var.s3_bucket_name
}
