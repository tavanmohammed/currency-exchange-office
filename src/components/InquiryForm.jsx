import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

function InquiryForm() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white border-2 border-gray-100 focus:border-amber-400 text-slate-900 placeholder-gray-400 p-3 rounded-xl outline-none transition';

  const labelClass =
    'text-gray-500 text-xs font-semibold uppercase tracking-widest block mb-1.5';

  return (
    <div className="grid md:grid-cols-2 gap-14 items-center">
      <div>
        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            {t('getInTouch')}
        </span>

        <h2 className="text-4xl font-black text-slate-900 leading-tight mb-5">
          {t('sendInquiry')}
        </h2>

        <p className="text-gray-500 leading-8 mb-8">
         {t('inquiryDescription')}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#08164a] flex items-center justify-center text-amber-400 text-lg shrink-0">
              📞
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Phone
              </p>
              <p className="text-slate-800 font-bold">٩٦٤٧٧٠١٥٢٧٧٥٦+</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#08164a] flex items-center justify-center text-amber-400 text-lg shrink-0">
              ✉️
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Email
              </p>
              <p className="text-slate-800 font-bold">
                mr.ameer.mirza984@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#08164a] flex items-center justify-center text-amber-400 text-lg shrink-0">
              📍
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                Location
              </p>
              <p className="text-slate-800 font-bold">
                Iraq, Kurdistan Region
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-slate-900 text-xl font-black mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-400 text-sm">
              We'll get back to you as soon as possible.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setError(null);
              }}
              className="mt-6 text-amber-600 text-sm font-bold hover:text-amber-500 transition"
            >
              Send another →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>{t('name')} *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Smith"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('phone')} *</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+964 XXX XXX XXXX"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('email')} *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('message')} *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="How can we help you?"
                className={`${inputClass} resize-none`}
              />
            </div>

            {error && <p className="text-red-500 text-sm">⚠ {error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#08164a] hover:bg-[#0d1f63] disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition"
            >
              {loading ? 'Sending…' : t('submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InquiryForm;
