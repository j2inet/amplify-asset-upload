import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { triggerProcessor } from './functions/trigger-processor/resource';

const backend = defineBackend({ auth, data, storage, triggerProcessor });

// Allow the trigger function to invoke the processing Lambda named by PROCESSOR_LAMBDA_NAME.
backend.triggerProcessor.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['lambda:InvokeFunction'],
    resources: ['*'],
  })
);
