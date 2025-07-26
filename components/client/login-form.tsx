"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard", // Redirect after successful login
      });
      if (error) {
        setAuthError(error.message || "Login failed. Please try again.");
      } else {
        // Handle successful login, e.g., redirect or show success message
        console.log("Login successful!");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Login</CardTitle>
        <CardDescription className="text-gray-500">
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    autoComplete="email"
                    className="focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your email address used for login.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    autoComplete="current-password"
                    className="focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your password must be at least 6 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Login
          </Button>
          {authError && (
            <div className="mt-1 flex justify-center text-center">
              <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-medium shadow-sm border border-red-300">
                {authError}
              </span>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
