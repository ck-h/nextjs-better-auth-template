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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const {} = await authClient.signUp.email({
      // const {data, error} = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Register</CardTitle>
        <CardDescription className="text-gray-500">
          Create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name..."
                    type="text"
                    autoComplete="email"
                    className="focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your name used for registration.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  This is your email address used for registration.
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
            Register
          </Button>
        </form>
      </Form>
    </Card>
  );
}
