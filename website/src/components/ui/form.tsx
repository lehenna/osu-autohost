"use client";
import { FormEventHandler, useCallback, useState } from "react";
import { Loader } from "./loader";
import { cn } from "@/lib/cn";

export interface FormOptions {
  children: React.ReactNode;
  className?: string;
  button?: (loader: React.ReactNode, pending: boolean) => React.ReactNode;
  buttonText?: string;
  submit: (formData: FormData) => Promise<void>;
}

export function Form({
  buttonText,
  button: customButton,
  className,
  children,
  submit,
}: FormOptions) {
  const [pending, setPending] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setPending(true);
      const formData = new FormData(event.target as HTMLFormElement);
      await submit(formData).finally(() => {
        setPending(false);
      });
    },
    [submit]
  );
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex flex-col gap-4", className)}
    >
      {children}
      {customButton ? (
        customButton(<Loader />, pending)
      ) : (
        <button className="bg-violet-500/20 text-violet-500 hover:bg-violet-500/30 rounded-md grid place-items-center transition-[background-color] font-medium h-10">
          {pending ? <Loader /> : buttonText}
        </button>
      )}
    </form>
  );
}
