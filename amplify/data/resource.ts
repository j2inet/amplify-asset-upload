import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { triggerProcessor } from '../functions/trigger-processor/resource';

const schema = a.schema({
  triggerProcessing: a
    .mutation()
    .arguments({ fileName: a.string().required() })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(triggerProcessor)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: { defaultAuthorizationMode: 'userPool' },
});
