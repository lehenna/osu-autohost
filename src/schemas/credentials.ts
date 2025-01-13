import {
  boolean,
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
  url,
} from "valibot";

export const credentialsFormSchema = object({
  clientId: pipe(string(), minLength(2)),
  secret: pipe(string(), minLength(2)),
  username: pipe(string(), minLength(2)),
  password: pipe(string(), minLength(2)),
  apiKey: pipe(string(), minLength(2)),
  host: pipe(string(), minLength(2)),
  port: pipe(string(), minLength(2)),
  botAccount: boolean(),
});

export const credentialsSchema = object({
  oauth: object({
    clientId: pipe(string(), minLength(2)),
    callbackUrl: pipe(string(), url()),
    secret: pipe(string(), minLength(2)),
  }),
  bancho: object({
    username: pipe(string(), minLength(2)),
    password: pipe(string(), minLength(2)),
    apiKey: pipe(string(), minLength(2)),
    host: pipe(string(), minLength(2)),
    port: pipe(number(), minValue(0)),
    botAccount: boolean(),
  }),
});
