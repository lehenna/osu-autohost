"use client";

import { useForm } from "react-hook-form";
import { InferOutput } from "valibot";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { credentialsFormSchema } from "@/schemas/credentials";
import { saveCredentials } from "@/actions/credentials";

export function CredentialsForm() {
  const router = useRouter();
  const form = useForm<InferOutput<typeof credentialsFormSchema>>({
    resolver: valibotResolver(credentialsFormSchema),
    defaultValues: {
      clientId: "",
      secret: "",
      username: "",
      password: "",
      apiKey: "",
      host: "irc.ppy.sh",
      port: "6667",
      botAccount: false,
    },
  });

  async function onSubmit(values: InferOutput<typeof credentialsFormSchema>) {
    const callbackUrl = `${window.location.protocol}//${window.location.host}/api/oauth/callback`;
    const res = await saveCredentials({
      oauth: {
        clientId: values.clientId,
        callbackUrl,
        secret: values.secret,
      },
      bancho: {
        username: values.username,
        apiKey: values.apiKey,
        password: values.password,
        host: values.host,
        port: parseInt(values.port),
        botAccount: values.botAccount,
      },
    });
    if (!res.success) {
      form.setError("root", {
        message: "Credentials are incorrect.",
      });
      return;
    }
    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID</FormLabel>
              <FormControl>
                <Input placeholder="0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret</FormLabel>
              <FormControl>
                <Input placeholder="idk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input placeholder="idk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="lehenna" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="idk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 w-full">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="irc.ppy.sh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="6667" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="botAccount"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Bot Account</FormLabel>
                <FormDescription>
                  Check this box if the associated account is identified as a
                  bot account and is verified by osu.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
