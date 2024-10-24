import { BaseSchema, flatten, parse, ValiError } from "valibot";

export type ValibotErrors = {
  message: string;
  issues: Record<string, string>;
};

export async function validateSchema<Input, Output>(
  schema: BaseSchema<Input, Output, any>,
  values: any
): Promise<[ValibotErrors, null] | [null, Output]> {
  try {
    const data = parse(schema, values);
    return [null, data];
  } catch (error) {
    if (error instanceof ValiError) {
      const issues = flatten(error.issues);
      if (!issues.nested)
        return [
          {
            message: error.message,
            issues: {
              root: issues.root ? issues.root[0] : "",
            },
          },
          null,
        ];
      const errors: Record<string, string> = {};
      for (const err in issues.nested) {
        errors[err] = issues.nested[err]?.[0] ?? "";
      }
      return [
        {
          message: error.message,
          issues: errors,
        },
        null,
      ];
    }
    return [
      {
        message: "Invalid data.",
        issues: {},
      },
      null,
    ];
  }
}
