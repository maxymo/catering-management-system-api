# Catering Management System

**Warning**
This API is only a prototype and is not safe or ready for production yet.

NodeJS: 18.12.1

## Getting Started

### Launch API locally

Follow these steps to run this API locally:

Create a free MongoDB database (https://www.mongodb.com/).

Copy nodemon.json from config directory to root directory and replace the values accordingly
```console
cp config/nodemon.json
```

Run API
```console
npm run startdemon
```

## Deploy resources to AWS

Install ClaudiaJS if not installed
```console
npm i -g claudia
```

Create zip file, run from root directory of project:
```console
claudia pack --no-optional-dependencies --output deploy/terraform/cms-api.zip
```

Go to terraform directory
```console
cd deploy/terraform
```

Ensure AWS credentials are in your aws profile

Deploy resources to AWS
```console
terraform apply -auto-approve
```

If deployment is successful, you will get the API url as an output
