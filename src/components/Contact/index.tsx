import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { config } from "../../data/config";
import TextReveal from "../TextReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

const ease = [0.22, 1, 0.36, 1] as const;

interface FormValues { name: string; email: string; message: string }
type FormField = keyof FormValues;

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
  value: string; error?: string; touched: boolean;
  onChange: (v: string) => void; onBlur: () => void;
}

function Field({ label, id, type = "text", rows, value, error, touched, onChange, onBlur }: FieldProps) {
  const hasError = touched && error;
  const isOk     = touched && !error && value.trim();

  const base = "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1e293b] placeholder-[#cbd5e1] outline-none transition-all duration-200";
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
        <textarea id={id} rows={rows} value={value} placeholder={`Votre ${label.toLowerCase()}…`}
          className={`${base} ${borderCls} resize-none`}
          onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
      ) : (
        <input id={id} type={type} value={value} placeholder={`Votre ${label.toLowerCase()}`}
          className={`${base} ${borderCls}`}
          onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
      )}
      <AnimatePresence>
        {hasError && (
          <motion.p
            key="err"
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

export default function Contact() {
  const [form, setForm]       = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const { ref: btnRef, offset, onMouseMove, onMouseLeave } = useMagnetic<HTMLButtonElement>(0.22);

  function handleChange(field: FormField, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  }
  function handleBlur(field: FormField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, form[field]) }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fields: FormField[] = ["name", "email", "message"];
    const newErrors: Partial<FormValues> = {};
    fields.forEach((f) => {
      setTouched((t) => ({ ...t, [f]: true }));
      const err = validate(f, form[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
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
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="card flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center"
            >
              <CheckCircle className="text-green-500" size={30} />
              <p className="text-sm text-[#64748b]">Message envoyé. Je vous répondrai rapidement.</p>
            </motion.div>
          ) : (
            <motion.form key="form"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              onSubmit={handleSubmit}
              className="card flex flex-col gap-5 rounded-2xl p-6"
              noValidate
            >
              <Field label="Nom"     id="name"    value={form.name}    error={errors.name}    touched={!!touched.name}    onChange={(v) => handleChange("name", v)}    onBlur={() => handleBlur("name")} />
              <Field label="Email"   id="email"   type="email" value={form.email}   error={errors.email}   touched={!!touched.email}   onChange={(v) => handleChange("email", v)}   onBlur={() => handleBlur("email")} />
              <Field label="Message" id="message" rows={4}     value={form.message} error={errors.message} touched={!!touched.message} onChange={(v) => handleChange("message", v)} onBlur={() => handleBlur("message")} />

              <motion.button
                ref={btnRef} type="submit"
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
                onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
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
