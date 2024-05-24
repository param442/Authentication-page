"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { reset } from "@/actions/reset";
import Form_error from "../Form-error";
import Form_success from "../Form_success";

const RestForm = () => {
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransictions] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit((data) => {
        onSubmit(data);
      })();
    }
  };
  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    startTransictions(() => {
      reset(data).then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess("");
        }
        if (data.success) {
          setSuccess(data.success);
          setError("");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLable="Forgot your Password!"
      backbuttonLabel="Back to Login"
      backbuttonHref="/auth/login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyPress={handleKeyPress} // Listen for key presses on the form
          className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Jhonedhoe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4"></div>
          <Form_error message={Error} />
          <Form_success message={Success} />
          <Button Hover={false} type="submit" className="w-full">
            {" "}
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RestForm;
