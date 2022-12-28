resource "aws_lambda_function" "api" {
  filename         = "${path.module}/cms-api.zip"
  function_name    = "${var.stage}-cms-api"
  role             = aws_iam_role.api.arn
  handler          = "lambda.handler"
  runtime          = "nodejs18.x"
  source_code_hash = filebase64sha256("${path.module}/cms-api.zip")

  environment {
    variables = {
      CATERING_MANAGEMENT_SYSTEM_CONNECTION_STRING = var.db_connection_string
      JWT_SECRET: var.jwt_secret
      ENVIRONMENT: var.stage
    }
  }
}

resource "aws_iam_role" "api" {
  name = "lambda_exec_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "api" {
  name = "lambda_exec_policy"
  role = aws_iam_role.api.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}
