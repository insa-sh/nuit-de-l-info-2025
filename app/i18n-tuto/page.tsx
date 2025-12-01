import { useTranslations } from "next-intl";
import React from "react";
import CookieLocale from "./CookieLocale";

export default function page() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <CookieLocale></CookieLocale>
    </div>
  );
}
