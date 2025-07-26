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
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/server/users";


// import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // email: z.string().email("Invalid email address"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export function RegisterForm() {
   
  //   const [successMessage, setSuccessMessage] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [state, formAction] = useActionState(
     (prevState: { success: boolean } | undefined, formData: FormData) =>
      signUp(formData),
    { success: false }

  )

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Register</CardTitle>
        <CardDescription className="text-gray-500">
          Create a new account by filling out the form below.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
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
          <ButtonWithLoader />
          {state?.success && (
            <div className="mt-1 flex justify-center text-center">
              <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium shadow-sm border border-green-300">
                Registration successful! Please check your email for
                confirmation.
              </span>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}

function ButtonWithLoader() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      disabled={pending}
    >
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}
