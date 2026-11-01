"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { waLink } from "@/lib/site";

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [f, setF] = useState({ name: "", org: "", phone: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = [t("intro"), `${t("name")}: ${f.name}`, f.org && `${t("org")}: ${f.org}`, f.phone && `${t("phone")}: ${f.phone}`, "", f.message].filter(Boolean).join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const input = "mt-1 w-full rounded-md border border-brand/20 bg-white px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-brand/10 p-6 sm:p-6">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("title")}</h2>
      <p className="text-sm text-muted">{t("hint")}</p>
      <label className="block text-sm font-medium">{t("name")}<input required className={input} value={f.name} onChange={set("name")} autoComplete="name" /></label>
      <label className="block text-sm font-medium">{t("org")}<input className={input} value={f.org} onChange={set("org")} autoComplete="organization" /></label>
      <label className="block text-sm font-medium">{t("phone")}<input type="tel" className={input} value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
      <label className="block text-sm font-medium">{t("message")}<textarea required rows={5} className={input} value={f.message} onChange={set("message")} /></label>
      <button className="w-full rounded-md bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-dark">{t("send")}</button>
    </form>
  );
}
