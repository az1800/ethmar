"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const maxChars = 500;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "message" ? value.slice(0, maxChars) : value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "الاسم مطلوب";
    if (!form.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "صيغة بريد إلكتروني غير صحيحة";
    }

    if (!form.phone.trim()) newErrors.phone = "رقم الجوال مطلوب";
    if (!form.subject.trim()) newErrors.subject = "الرجاء اختيار الموضوع";
    if (!form.message.trim()) newErrors.message = "الرسالة مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Run your validation first
  if (!validateForm()) return;

  try {
    await fetch("https://script.google.com/macros/s/AKfycbz4q9gT5q30BWRpIE-a2k3AJIpxaZ5GnQlDbN_qNKmrit1w6taASYXV3kpBpvCDRfrQ/exec", {
      method: "POST",
      mode: "no-cors", // 👈 important
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    // With no-cors, we can't read the response,
    // but the request *will* reach Google Sheets.
    alert("تم إرسال رسالتك بنجاح ✅");

    setForm({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  } catch (err: any) {
    console.error("Fetch error:", err);
    alert("تعذر الاتصال بالخادم. تأكد من الرابط أو الاتصال بالإنترنت.");
  }
};




  return (
    <section className="min-h-screen bg-slate-100 dark:bg-slate-900 py-16">
      <div
        dir="rtl"
        className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-10 shadow-lg dark:bg-slate-800"
      >
        {/* 🔙 Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm">
            <IoArrowBack size={18} />
          </span>
          <span>العودة</span>
        </button>

        {/* 🖼 Logo instead of h1 */}
        <img
          src="/ethmarlogoP.svg"
          className="mx-auto mb-4"
          alt="Ethmar Logo"
          width={90}
          height={90}
        />

        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-300">
          سنرد على رسالتك في أسرع وقت ممكن  
        </p>

        {/* 📝 Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-200">
              الاسم الكامل
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="اكتب اسمك"
              className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-200">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-200">
              رقم الجوال
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="05XXXXXXXX"
              className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-200">
              الموضوع
            </label>
            <div className="relative">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full appearance-none rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">اختر الموضوع</option>
                <option value="استفسار">استفسار عام</option>
                <option value="فرصة تعاون">فرصة تعاون</option>
              </select>
              <svg
                className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-200">
              الرسالة
            </label>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا"
              className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {form.message.length}/{maxChars}
            </div>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-3xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </section>
  );
}

