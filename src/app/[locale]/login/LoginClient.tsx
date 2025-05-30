'use client';

import { useTranslations } from "next-intl";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Card, CardContent } from "@/Components/ui/card";
import LanguageSwitcher from "@/Components/global/LanguageSwitcher";
import { useParams } from 'next/navigation';
import { useLoginAction } from "@/customeHooks/useLoginAction";
import { useRedirectIfToken } from "@/customeHooks/useRedirectIfToken";

export default function LoginClient() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const [formState, action] = useLoginAction(locale);
  useRedirectIfToken(locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-sm shadow-md">
        <CardContent className="p-6">
          <form action={action} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">{t("login")}</h2>

            {formState.message && (
              <div className="text-sm text-red-500 text-center">
                {formState.message}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}