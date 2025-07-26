"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";


export const signUp = async (formData: FormData) => {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

  try {
	  await auth.api.signUpEmail({
			body: {
		  	  name: name,
			  email: email,
			  password: password,
			},
		});
		return { success: true };

  } catch (error) {
	  if (error instanceof APIError) {
			console.error("API Error signing up:", error.message);
	  }
  }
}
export const signIn = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

  try {
	  await auth.api.signInEmail({
			body: {
			  email: email,
			  password: password,
			},
		});
		return { success: true };

  } catch (error) {
	  if (error instanceof APIError) {
			console.error("API Error signing up:", error.message);
	  }
  }
}