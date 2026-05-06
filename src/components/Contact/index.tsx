import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

interface FormValues {
  name: string;
  email: string;
  message: string;
}
type FormField = keyof FormValues;

const ease = [0.16, 1, 0.3, 1] as const;

function validate(field: FormField, value: string): string | undefined {
  if (field === "name" && !value.trim()) return "Votre nom est requis";
  if (field === "email") {
    if (!value.trim()) return "Email requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format invalide";
  }
  if (field === "message" && value.trim().length < 10)
    return "10 caractères minimum";
}

interface FieldProps {
  label: string;
  id: FormField;
  type?: string;
  rows?: number;
  value: string;
  error?: string;
  touched: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}

function Field({ label, id, type = "text", rows, value, error, touched, onChange, onBlur }: FieldProps) {
  const hasError = touched && error;
  const isOk = touched && !error && value.trim();

  const inputClass = [
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm font-light text-white/80 placeholder-white/20 outline-none backdrop-blur-sm transition-all duration-200",
    hasError
      ? "border-red-500/50 focus:border-red-500/80"
      : isOk
      ? "border-emerald-500/40 focus:border-emerald-500/60"
      : "border-white/10 focus:border-white/25",
  ].join(" ");

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-xs font-light uppercase tracking-[0.15em] text-white/30">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={`Votre ${label.toLowerCase()}...`}
          className={inputClass + " resize-none"}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={`Votre ${label.toLowerCase()}`}
          className={inputClass}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}
      <AnimatePresence>
        {hasError && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-xs text-red-400/80"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const { ref: btnRef, offset, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>(0.25);

  function handleChange(field: FormField, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validate(field, value) }));
    }
  }

  function handleBlur(field: FormField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, form[field]) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fields: FormField[] = ["name", "email", "message"];
    const newErrors: Partial<FormValues> = {};
    const newTouched: Partial<Record<FormField, boolean>> = {};
    fields.forEach((f) => {
      newTouched[f] = true;
      const err = validate(f, form[f]);
      if (err) newErrors[f] = err;
    });
    setTouched(newTouched);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mb-10"
      >
        <p className="text-xs font-light uppercase tracking-[0.2em] text-white/25">Contact</p>
        <TextReveal as="h2" className="mt-2 block text-3xl font-light tracking-heading text-gradient">
          Me contacter
        </TextReveal>
      </motion.div>

      <div className="grid gap-12 sm:grid-cols-2">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-sm font-light leading-relaxed text-white/40">
            Une opportunité d'alternance, un projet à développer, ou simplement
            envie d'échanger ? Écrivez-moi.
          </p>
          <a
            href={`mailto:${config.identity.email}`}
            className="mt-6 block text-sm font-light text-white/50 transition-colors hover:text-white/90"
          >
            {config.identity.email}
          </a>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm font-light text-white/30 transition-colors hover:text-white/70"
          >
            github.com/Valent1n2-alcAla →
          </a>
        </motion.div>

        {/* Right — form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="glass-card flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center"
            >
              <CheckCircle className="text-emerald-400" size={32} />
              <p className="text-sm font-light text-white/60">
                Message envoyé. Je vous répondrai rapidement.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              onSubmit={handleSubmit}
              className="glass-card flex flex-col gap-5 rounded-2xl p-6"
              noValidate
            >
              <Field
                label="Nom"
                id="name"
                value={form.name}
                error={errors.name}
                touched={!!touched.name}
                onChange={(v) => handleChange("name", v)}
                onBlur={() => handleBlur("name")}
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                error={errors.email}
                touched={!!touched.email}
                onChange={(v) => handleChange("email", v)}
                onBlur={() => handleBlur("email")}
              />
              <Field
                label="Message"
                id="message"
                rows={4}
                value={form.message}
                error={errors.message}
                touched={!!touched.message}
                onChange={(v) => handleChange("message", v)}
                onBlur={() => handleBlur("message")}
              />
              <motion.button
                ref={btnRef}
                type="submit"
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.06] px-6 py-2.5 text-sm font-light text-white/70 transition-colors hover:border-white/20 hover:text-white"
              >
                <Send size={13} />
                Envoyer
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
