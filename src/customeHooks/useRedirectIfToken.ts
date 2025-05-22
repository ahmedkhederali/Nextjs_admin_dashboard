import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfToken(locale: string) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/${locale}/dashboard`);
    }
  }, [router, locale]);
}
