variable "aws_region" {
  type = string
  default = "eu-west-1"
}

variable "aws_account" {
  type = string
  default = "972670838762"
}

variable "stage" {
  type = string
  default = "stg"
}

variable "db_connection_string" {
  type = string
}

variable "jwt_secret" {
  type = string
}
