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

import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Login } from "@/actions/login";
import Form_error from "../Form-error";
import Form_success from "../Form_success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const SearchParams = useSearchParams();
  const UrlError =
    SearchParams.get("error") == "OAuthAccountNotLinked"
      ? "Email alredy in use ith different provider!"
      : "";
  const [ShowTwoFactor, SetTwoFactor] = useState(false);
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransictions] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit((data) => {
        onSubmit(data);
      })();
    }
  };
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransictions(() => {
      Login(data)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.TwoFactor) {
            SetTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLable="welcome back"
      backbuttonLabel="Don't have an account"
      backbuttonHref="/auth/register"
      showsocial>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyPress={handleKeyPress} // Listen for key presses on the form
          className="space-y-6">
          {ShowTwoFactor && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"code"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="your code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {!ShowTwoFactor && (
            <>
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
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={"password"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Your Password"
                          type="password"
                        />
                      </FormControl>
                      <div className="relative left-[13%]">
                        <Button
                          size={"sm"}
                          className=" absolute  "
                          variant={"link"}
                          Hover={false}>
                          <Link
                            className=" w-[10%] underline-offset-4 hover:underline"
                            href="/auth/reset">
                            {" "}
                            Forget Password?
                          </Link>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <Form_error message={Error || UrlError} />
          <Form_success message={Success} />
          <Button Hover={false} type="submit" className="w-full">
            {" "}
            {ShowTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
