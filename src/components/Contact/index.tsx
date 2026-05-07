import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

const API_URL = "http://localhost:8000/api/contact";
const ease = [0.22, 1, 0.36, 1] as const;

interface FormValues { name: string; email: string; message: string }
type FormField = keyof FormValues;
type Status = "idle" | "submitting" | "success" | "error";

function validate(field: FormField, value: string): string | undefined {
  if (field === "name" && !value.trim()) return "Votre nom est requis";
  if (field === "email") {
    if (!value.trim()) return "Email requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format invalide";
  }
  if (field === "message" && value.trim().length < 10) return "10 caractères minimum";
}

interface FieldProps {
  label: string; id: FormField; type?: string; rows?: number;
  value: string; error?: string; touched: boolean; disabled: boolean;
  onChange: (v: string) => void; onBlur: () => void;
}

function Field({ label, id, type = "text", rows, value, error, touched, disabled, onChange, onBlur }: FieldProps) {
  const hasError = touched && error;
  const isOk     = touched && !error && value.trim();

  const base = "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1e293b] placeholder-[#cbd5e1] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const borderCls = hasError
    ? "border-red-300 focus:border-red-400"
    : isOk
    ? "border-green-300 focus:border-green-400"
    : "border-[#e2e8f0] focus:border-green-400";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
        {label}
      </label>
      {rows ? (
        <textarea id={id} rows={rows} value={value} disabled={disabled}
          placeholder={`Votre ${label.toLowerCase()}…`}
          className={`${base} ${borderCls} resize-none`}
          onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
      ) : (
        <input id={id} type={type} value={value} disabled={disabled}
          placeholder={`Votre ${label.toLowerCase()}`}
          className={`${base} ${borderCls}`}
          onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
      )}
      <AnimatePresence>
        {hasError && (
          <motion.p key="err"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="mt-1 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const EMPTY_FORM: FormValues = { name: "", email: "", message: "" };
const AUTO_DISMISS_MS = 5000;

export default function Contact() {
  const [form, setForm]       = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors]   = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [status, setStatus]   = useState<Status>("idle");
  // Honeypot — doit rester vide
  const [website, setWebsite] = useState("");

  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: btnRef, offset, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>(0.22);

  const isSubmitting = status === "submitting";

  // Auto-dismiss success/error après 5 s
  useEffect(() => {
    if (status === "success" || status === "error") {
      dismissTimer.current = setTimeout(() => setStatus("idle"), AUTO_DISMISS_MS);
    }
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [status]);

  function handleChange(field: FormField, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  }

  function handleBlur(field: FormField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, form[field]) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const fields: FormField[] = ["name", "email", "message"];
    const newErrors: Partial<FormValues> = {};
    const allTouched: Partial<Record<FormField, boolean>> = {};

    fields.forEach((f) => {
      allTouched[f] = true;
      const err = validate(f, form[f]);
      if (err) newErrors[f] = err;
    });

    setTouched(allTouched);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: "Message depuis le portfolio",
          message: form.message,
          website, // honeypot — vide pour les humains
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus("success");
      setForm(EMPTY_FORM);
      setTouched({});
      setErrors({});
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">Contact</p>
        <TextReveal as="h2" className="font-display mt-2 block text-3xl font-medium tracking-display text-[#1e293b]">
          Me contacter
        </TextReveal>
      </motion.div>

      <div className="grid gap-12 sm:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease }}
        >
          <p className="text-sm leading-relaxed text-[#64748b]">
            Une opportunité d'alternance, un projet à développer, ou simplement
            envie d'échanger ? Écrivez-moi directement.
          </p>
          <a href={`mailto:${config.identity.email}`}
            className="mt-5 block text-sm font-medium text-green-600 hover:text-green-700">
            {config.identity.email}
          </a>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer"
            className="mt-1.5 block text-sm text-[#94a3b8] hover:text-[#64748b]">
            github.com/Valent1n2-alcAla →
          </a>
        </motion.div>

        {/* Right */}
        <div>
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div key="ok"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease }}
                className="mb-4 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4"
              >
                <CheckCircle className="flex-shrink-0 text-green-500" size={18} />
                <div>
                  <p className="text-sm font-medium text-green-800">Message envoyé, merci !</p>
                  <p className="text-xs text-green-600">Je vous répondrai dans les plus brefs délais.</p>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div key="err-banner"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease }}
                className="mb-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4"
              >
                <AlertCircle className="flex-shrink-0 text-red-400" size={18} />
                <p className="text-sm text-red-700">
                  Oups, une erreur est survenue. Réessayez ou écrivez-moi par email.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease }}
            onSubmit={handleSubmit}
            className="card flex flex-col gap-5 rounded-2xl p-6"
            noValidate
          >
            {/* Honeypot — caché aux visiteurs, piège pour les bots */}
            <input
              type="text" name="website" value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1} aria-hidden="true" autoComplete="off"
              style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
            />

            <Field label="Nom"     id="name"    value={form.name}    error={errors.name}    touched={!!touched.name}    disabled={isSubmitting} onChange={(v) => handleChange("name", v)}    onBlur={() => handleBlur("name")} />
            <Field label="Email"   id="email"   type="email" value={form.email}   error={errors.email}   touched={!!touched.email}   disabled={isSubmitting} onChange={(v) => handleChange("email", v)}   onBlur={() => handleBlur("email")} />
            <Field label="Message" id="message" rows={4}     value={form.message} error={errors.message} touched={!!touched.message} disabled={isSubmitting} onChange={(v) => handleChange("message", v)} onBlur={() => handleBlur("message")} />

            <motion.button
              ref={btnRef} type="submit" disabled={isSubmitting}
              animate={{ x: offset.x, y: offset.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
              onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
              className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? <><Loader2 size={13} className="animate-spin" /> Envoi…</>
                : <><Send size={13} /> Envoyer</>
              }
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
