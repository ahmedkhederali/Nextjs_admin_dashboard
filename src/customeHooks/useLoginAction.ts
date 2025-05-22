import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login as reduxLogin } from "@/store/slices/authSlice";
import { loginFunction } from "@/actions/login";

export function useLoginAction(locale: string) {
  const dispatch = useDispatch();
  const router = useRouter();

  return useActionState(
    async (prevState: { message: string }, formData: FormData) => {
      const result = await loginFunction(prevState, formData);
      if (result.message === "success") {
        if (typeof result.token === "string") {
          // Store token in cookies
          document.cookie = `token=${result.token}; path=/; Secure; SameSite=Strict`;
          // Store token in localStorage
          localStorage.setItem("token", result.token);
          dispatch(reduxLogin({ email: result.email ?? "" }));
          router.push(`/${locale}/dashboard`);
        }
      }
      return result;
    },
    { message: "" }
  );
}