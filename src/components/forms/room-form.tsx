"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { Room, RoomOptions } from "@/models/room";
import { roomFormSchema } from "@/schemas/room";

export function RoomForm({
  defaultValues,
  submit,
}: {
  defaultValues?: Omit<Room, "id">;
  submit: (values: Omit<RoomOptions, "id">) => Promise<
    | {
        success: true;
        data: Room;
      }
    | {
        success: false;
        message: string;
      }
  >;
}) {
  const router = useRouter();
  const [diff, setDiff] = useState([0, 20]);
  const [length, setLength] = useState([0, 15]);
  const { setValue, ...form } = useForm<InferOutput<typeof roomFormSchema>>({
    resolver: valibotResolver(roomFormSchema),
    defaultValues: {
      name: "",
      password: "",
      gamemode: "0",
      size: "16",
    },
  });

  useEffect(() => {
    if (!defaultValues) return;
    setDiff([defaultValues.minDiff, defaultValues.maxDiff]);
    setLength([defaultValues.minLength / 60, defaultValues.maxLength / 60]);
    setValue("name", defaultValues.name);
    setValue("gamemode", defaultValues.gamemode.toString());
    setValue("password", defaultValues.password);
    setValue("size", defaultValues.size.toString());
  }, [defaultValues, setValue]);

  async function onSubmit(values: InferOutput<typeof roomFormSchema>) {
    const res = await submit({
      name: values.name,
      gamemode: parseInt(values.gamemode),
      size: parseInt(values.size),
      password: values.password,
      minDiff: diff[0],
      maxDiff: diff[1],
      minLength: length[0],
      maxLength: length[1],
    });
    if (res.success === false) {
      form.setError("root", {
        message: res.message,
      });
      return;
    }
    router.push(`/rooms/${res.data.id}`);
  }

  return (
    <Form setValue={setValue} {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="0.00 - 3.50 | Auto Host Rotate"
                  {...field}
                />
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
                <Input placeholder="123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gamemode"
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
                    <SelectItem value="0">osu!std</SelectItem>
                    <SelectItem value="1">osu!mania</SelectItem>
                    <SelectItem value="2">osu!taiko</SelectItem>
                    <SelectItem value="3">osu!catch</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  max={16}
                  min={2}
                  placeholder="16"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative pb-6">
          <h3 className="font-medium text-white text-sm mb-3">
            Difficulty (stars)
          </h3>
          <DualRangeSlider
            label={(value) => <span>{value}</span>}
            value={diff}
            onValueChange={setDiff}
            labelPosition="bottom"
            min={0}
            max={20}
            step={0.1}
          />
        </div>
        <div className="relative pb-6">
          <h3 className="font-medium text-white text-sm mb-3">
            Map duration (minutes)
          </h3>
          <DualRangeSlider
            label={(value) => <span>{value}</span>}
            value={length}
            onValueChange={setLength}
            labelPosition="bottom"
            min={0}
            max={15}
            step={0.1}
          />
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
