"use client";

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

import z, { infer } from "zod";
import { SignupSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import Form_error from "../Form-error";
import Form_success from "../Form_success";
const SignupForm = () => {
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransictions] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit((data) => {
        console.log(data); // You can replace this with your form submission logic
      })();
    }
  };
  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    startTransictions(() => {
      register(data).then((data) => {
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
      headerLable="welcome"
      backbuttonLabel="Already have an account?"
      backbuttonHref="/auth/login"
      showsocial
      className=" leading-tight ">
      <Form {...form}>
        {" "}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyPress={handleKeyPress} // Listen for key presses on the form
          className=" desktop:space-y-2 laptop:space-y-1  ">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
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
                      type="email"
                      placeholder="YourEmail@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
          </div>
          <div>
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="password"
                      placeholder="Your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Form_error message={Error} />
          <Form_success message={Success} />

          <Button type="submit" size={"lg"} className="w-full" Hover={false}>
            {" "}
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignupForm;
