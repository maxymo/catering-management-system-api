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
  default = "mongodb+srv://nodeuser:Test1234@cluster0-hmpes.mongodb.net/catering?w=majority"
}

variable "jwt_secret" {
  type = string
  default = "aW!t$nKK!*$agbodu9iXzFKR9YsktN6Ea%mz8Uiddopap@H%Ep6C3afF!eyKVKP*SQ@g72qteHJg7xLvFjVG&NqKBRi%r%Zud^o@uj$$@&7MCRKyYseu&BpR*!n%^4Xk"
}
