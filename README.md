# amplify-asset-upload
## Setup

Amplify Gen 2 app: users sign in (email/password), pick one Excel/CSV file and upload it to S3
(`uploads/<name>`). After upload, a backend function invokes the Lambda named by the
`PROCESSOR_LAMBDA_NAME` environment variable with the uploaded file name as its single argument.

1. `npm install`
2. `PROCESSOR_LAMBDA_NAME=my-lambda npx ampx sandbox` (generates `amplify_outputs.json`)
3. `npm run dev`
