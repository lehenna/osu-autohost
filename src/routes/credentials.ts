import { createController } from "@/lib/controller";
import { createCredentialsFile } from "@/lib/credentials";
import { setup } from "@/lib/setup";
import { validateSchema } from "@/lib/validate-schema";
import { credentialsSchema } from "@/schemas/credentials";
import { Router } from "express";

const CredentialsRoutes = Router();

CredentialsRoutes.post(
  "/",
  createController(async (req, res) => {
    const credentials = await validateSchema(credentialsSchema, req.body);
    const { success } = await setup(credentials);
    if (success) {
      await createCredentialsFile(credentials);
    }
    res.status(200).json({
      success,
    });
  })
);

export { CredentialsRoutes };
