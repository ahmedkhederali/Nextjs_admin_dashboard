import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="flex justify-center items-center h-screen text-center">
      <h1 className="text-2xl font-bold">{t("notFound")}</h1>
    </div>
  );
}
