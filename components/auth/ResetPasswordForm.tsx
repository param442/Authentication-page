"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { PasswordSchema } from "@/schemas";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form_error from "../Form-error";
import Form_success from "../Form_success";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { PasswordVerification } from "@/actions/VerfyResetPasswordToken";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      OldPassword: "",
      NewPassword: "",
    },
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: z.infer<typeof PasswordSchema>) => {
    if (!Token) {
      setError("Token Does not exist");
      return;
    }
    startTransition(() => {
      PasswordVerification(data, Token).then((data) => {
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
      headerLable="Reset password here"
      backbuttonHref="/auth/reset"
      backbuttonLabel="Click here to resend Authentication Token?">
      <Form {...form}>
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyPress={handleKeyPress}
            className="space-y-6 flex flex-col w-[100%]">
            <div>
              <FormField
                control={form.control}
                name="OldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Old Password"
                        type="password"
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
                name="NewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="New Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Form_error message={error} />
            <Form_success message={success} />
            <Button type="submit">Submit</Button>
          </form>
          <Button
            type={"button"}
            size={"sm"}
            className="w-[30%] mt-4"
            onClick={() => router.push("/auth/login")}>
            Back to Login
          </Button>
        </div>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
