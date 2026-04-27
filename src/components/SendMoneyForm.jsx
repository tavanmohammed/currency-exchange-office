import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

function SendMoneyForm() {
  const { t } = useTranslation();

  const emptyForm = {
    sender: '',
    senderPhone: '',
    senderEmail: '',
    receiver: '',
    receiverPhone: '',
    receiverEmail: '',
    country: '',
    city: '',
    amount: '',
    paymentMethod: '',
    deliveryMethod: '',
    date: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_SEND_MONEY_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const inputClass =
    'w-full bg-white/10 border border-white/20 focus:border-amber-400 text-white placeholder-white/30 p-3 rounded-xl outline-none transition';

  const labelClass =
    'text-white/50 text-xs font-semibold uppercase tracking-widest block mb-1.5';

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
          
  const templateParams = {
  sender_name: form.sender,
  sender_phone: form.senderPhone,
  sender_email: form.senderEmail,

  receiver_name: form.receiver,
  receiver_phone: form.receiverPhone,
  receiver_email: form.receiverEmail,

  country: form.country,
  city: form.city,
  amount: form.amount,

  send_method: form.paymentMethod,
  delivery_method: form.deliveryMethod,

  message: `Transfer Date: ${form.date}`,
};

console.log("EMAILJS PARAMS:", templateParams);

await emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  templateParams,
  PUBLIC_KEY
);

console.log("EMAILJS PARAMS:", templateParams);

await emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  templateParams,
  PUBLIC_KEY
);
},
        
        PUBLIC_KEY
      );

      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#08164a] to-[#0d1f63] rounded-3xl p-8 md:p-10">
      <div className="mb-8">
        <span className="inline-block bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
          Transfer
        </span>

        <h2 className="text-3xl font-black text-white mb-3">
          {t('sendMoney')}
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5">
          <p className="text-white/60 text-sm">✔ {t('ruleName')}</p>
          <p className="text-white/60 text-sm">✔ {t('rulePayment')}</p>
          <p className="text-white/60 text-sm">✔ {t('ruleContact')}</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">✅</div>

          <h3 className="text-white text-xl font-black mb-2">
            {t('submitSuccess')}
          </h3>

          <p className="text-white/50 text-sm">
            We'll contact you shortly to confirm your transfer.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setError(null);
            }}
            className="mt-6 text-amber-400 text-sm font-bold hover:text-amber-300 transition"
          >
            New request →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Info */}
          <div>
            <h3 className="text-white font-bold mb-3">Sender Information</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Sender Name *</label>
                <input
                  type="text"
                  name="sender"
                  value={form.sender}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Sender Phone *</label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={form.senderPhone}
                  onChange={handleChange}
                  required
                  placeholder="+1 000 000 0000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Sender Email *</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={form.senderEmail}
                  onChange={handleChange}
                  required
                  placeholder="sender@email.com"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="text-white font-bold mb-3">Receiver Information</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Receiver Name *</label>
                <input
                  type="text"
                  name="receiver"
                  value={form.receiver}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Receiver Phone *</label>
                <input
                  type="tel"
                  name="receiverPhone"
                  value={form.receiverPhone}
                  onChange={handleChange}
                  required
                  placeholder="+964 000 000 0000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Receiver Email *</label>
                <input
                  type="email"
                  name="receiverEmail"
                  value={form.receiverEmail}
                  onChange={handleChange}
                  required
                  placeholder="receiver@email.com"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t('country')} *</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                placeholder="e.g. Iraq"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('city')} *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="e.g. Erbil"
                className={inputClass}
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className={labelClass}>{t('amount')} (USD) *</label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 font-black text-lg">
                $
              </span>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="0.00"
                min="1"
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          {/* Methods */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t('paymentMethod')} *</label>
              <input
                type="text"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
                placeholder="e.g. Cash, Bank"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t('deliveryMethod')} *</label>
              <input
                type="text"
                name="deliveryMethod"
                value={form.deliveryMethod}
                onChange={handleChange}
                required
                placeholder="e.g. Cash, Transfer"
                className={inputClass}
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={labelClass}>Transfer Date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>

          {error && <p className="text-red-400 text-sm">⚠ {error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-black px-6 py-4 rounded-xl transition text-base"
          >
            {loading ? 'Sending…' : `${t('submit')} →`}
          </button>
        </form>
      )}
    </div>
  );
}

export default SendMoneyForm;
