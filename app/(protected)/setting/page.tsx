"use client";
import React, { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "@/actions/Setting";
import { toast } from "sonner";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingSchema } from "@/schemas";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { User_current_status } from "@/hooks/User_current_status";
import Form_error from "@/components/Form-error";
import Form_success from "@/components/Form_success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const SettingPage = () => {
  const { update } = useSession();
  const user = User_current_status();
  const [ispending, startTransition] = useTransition();
  const [Error, SetError] = useState<string | undefined>("");
  const [Success, SetSucess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newpassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorAuthenticationEnabled || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      Settings(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            update();
            toast.success(data.success);
          }
        })
        .catch(() => SetError("Something went worng"));
    });
  };

  return (
    <Card className="w-[600px] mt-2 ">
      <CardHeader>
        <p className="text-2xl font-semibold flex flex-row items-center justify-center">
          <IoIosSettings /> Settings
        </p>
      </CardHeader>
      <CardContent className="flex felx-row justify-between items-center">
        <Form {...form}>
          <form
            className="space-y-1 text-sm w-full"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Jhon Doe"
                        disabled={ispending}
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
                        placeholder="example@jhon.com"
                        disabled={user?.isOAuth ? true : ispending}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!user?.isOAuth && (
              <div>
                <FormField
                  control={form.control}
                  name={"password"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          disabled={ispending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {!user?.isOAuth && (
              <div>
                <FormField
                  control={form.control}
                  name={"newpassword"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          disabled={ispending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div>
              <FormField
                control={form.control}
                name={"role"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={ispending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={userRole.ADMIN}>ADMIN</SelectItem>
                        <SelectItem value={userRole.USER}>USER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!user?.isOAuth && (
              <div>
                <FormField
                  control={form.control}
                  name={"isTwoFactorEnabled"}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between shadow-sm rounded-lg border p-3">
                      <div>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable Two Factor Authenticatoion For Your Account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={ispending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button size={"lg"} Hover={false} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SettingPage;
