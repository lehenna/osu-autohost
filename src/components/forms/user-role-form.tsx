"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { InferOutput } from "valibot";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userRoleSchema } from "@/schemas/user-role";
import { setUserRole } from "@/actions/users";
import { useUserContext } from "@/context/user";
import { DialogClose } from "../ui/dialog";

export function UserRoleForm({
  userId,
  role,
}: {
  userId: number;
  role: string;
}) {
  const user = useUserContext();
  const { setValue, ...form } = useForm<InferOutput<typeof userRoleSchema>>({
    resolver: valibotResolver(userRoleSchema),
    defaultValues: {
      role: "user",
    },
  });

  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  async function onSubmit(values: InferOutput<typeof userRoleSchema>) {
    const user = await setUserRole(userId, values.role);
    if (!user) {
      form.setError("root", {
        message: "Permission denied.",
      });
      return;
    }
  }

  return (
    <Form setValue={setValue} {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game mode</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Gamemode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user.role === "master" ? (
                      <SelectItem value="admin">Admin</SelectItem>
                    ) : null}
                    {user.role === "admin" || user.role === "master" ? (
                      <SelectItem value="moder">Moder</SelectItem>
                    ) : null}
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Set Role</Button>
        </DialogClose>
      </form>
    </Form>
  );
}
