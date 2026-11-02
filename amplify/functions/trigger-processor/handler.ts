import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

const client = new LambdaClient({});

export const handler = async (event: { arguments: { fileName: string } }) => {
  const functionName = process.env.PROCESSOR_LAMBDA_NAME;
  if (!functionName) {
    throw new Error('PROCESSOR_LAMBDA_NAME environment variable is not set');
  }
  const { fileName } = event.arguments;
  const result = await client.send(
    new InvokeCommand({
      FunctionName: functionName,
      InvocationType: 'Event',
      Payload: new TextEncoder().encode(JSON.stringify(fileName)),
    })
  );
  if (!result.StatusCode || result.StatusCode >= 300 || result.FunctionError) {
    throw new Error(`Failed to invoke ${functionName}`);
  }
  return 'invoked';
};
