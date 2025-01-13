import { Response } from "express";
import { BaseSchema, flatten, parseAsync, ValiError } from "valibot";

export class ValidateSchemaError extends Error {
  readonly issues: Record<string, string[] | string>;

  constructor(message: string, issues: Record<string, string[] | string> = {}) {
    super(message);
    this.issues = issues;
  }

  createResponse(res: Response) {
    return res.status(400).json({
      message: this.message,
      issues: this.issues,
    });
  }
}

export async function validateSchema<Input, Output>(
  schema: BaseSchema<Input, Output, any>,
  values: any
): Promise<Output> {
  try {
    const data = await parseAsync(schema, values);
    return data;
  } catch (error) {
    if (error instanceof ValiError) {
      const issues = flatten(error.issues);
      if (!issues.nested)
        throw new ValidateSchemaError(error.message ?? "Validation error.", {
          root: issues.root ? issues.root[0] : "",
        });
      const errors: Record<string, string> = {};
      for (const err in issues.nested) {
        errors[err] = issues.nested[err]?.[0] ?? "";
      }
      throw new ValidateSchemaError(
        error.message ?? "Validation error.",
        errors
      );
    }
    throw new ValidateSchemaError("Internal error.");
  }
}
