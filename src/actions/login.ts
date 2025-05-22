'use server';
import { redirect } from "next/navigation";

export async function loginFunction(
  formState: { message: string },
  formData: FormData
) {
  let shouldRedirect = false;

  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || email.length < 3) {
      return { message: "Email is too short" };
    }
    if (typeof password !== 'string' || password.length < 6) {
      return { message: "Password is too short" };
    }
    if (email === 'admin@example.com' && password === 'admin123') {
      shouldRedirect = true;
      return {
        message: 'success',
        token: 'Bearer eyJ0eXAiOiAiSldUIiwgInR5cGUiOiAiQmVhcmVyIiwgInZhbCI6ICIxMjM0NS1hYmNkLWVmZ2gtMTIzNC01Njc4OTAifQ==',
        email
      };
    } else {
      return { message: "Invalid credentials" };
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }

  // Redirect outside the try/catch
  if (shouldRedirect) {
    redirect('/en/dashboard');
  }
  return { message: 'Login failed' };
}