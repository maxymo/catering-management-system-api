# CateringManagementSystem

NodeJS: 16.13.2
Angular: 15.0.0

## Getting Started

Follow these steps to run this app locally

- Create a free MongoDB database (https://www.mongodb.com/).
- Create nodemon.json file in root folder with the following environment constants (replace its values with the correct for your environment)

```json
{
  "env": {
    "CATERING_MANAGEMENT_SYSTEM_CONNECTION_STRING": "mongodb+srv://nodeuser:XXXXXXXXX@xxxxxx.mongodb.net/xxxxxxx?w=majority",
    "JWT_SECRET": "secret this should be longer"
  }
}
```

## Backend (API)

### Launch
Run `npm run startdemon`

## Pack for Lambda

1. Install ClaudiaJS if not installed
`npm i -g claudia`

2. Create zip file `claudia pack --no-optional-dependencies --output deploy/claudia/catering-management-ssystem-api.zip`
