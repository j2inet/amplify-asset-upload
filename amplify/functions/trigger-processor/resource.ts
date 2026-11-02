import { defineFunction } from '@aws-amplify/backend';

export const triggerProcessor = defineFunction({
  name: 'triggerProcessor',
  entry: './handler.ts',
  environment: {
    // Name of the Lambda to invoke after an upload. Set PROCESSOR_LAMBDA_NAME in the build environment.
    PROCESSOR_LAMBDA_NAME: process.env.PROCESSOR_LAMBDA_NAME ?? '',
  },
});
