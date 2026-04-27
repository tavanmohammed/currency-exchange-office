import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSlider from '../components/HeroSlider';
import MarketLiveSection from '../components/MarketLiveSection';
import InquiryForm from '../components/InquiryForm';
import SendMoneyForm from '../components/SendMoneyForm';
import Footer from '../components/Footer';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://currency-exchange-office.onrender.com';

/* ─── data ──────────────────────────────────────────────── */
const europeCurrencies = [
  ['EUR','🇪🇺 Euro'],['GBP','🇬🇧 British Pound'],['CHF','🇨🇭 Swiss Franc'],
  ['NOK','🇳🇴 Norwegian Krone'],['SEK','🇸🇪 Swedish Krona'],['DKK','🇩🇰 Danish Krone'],
  ['PLN','🇵🇱 Polish Zloty'],['CZK','🇨🇿 Czech Koruna'],['HUF','🇭🇺 Hungarian Forint'],
  ['RON','🇷🇴 Romanian Leu'],['BGN','🇧🇬 Bulgarian Lev'],['ISK','🇮🇸 Icelandic Krona'],
  ['ALL','🇦🇱 Albanian Lek'],['RSD','🇷🇸 Serbian Dinar'],['MKD','🇲🇰 Macedonian Denar'],
  ['BAM','🇧🇦 Bosnia Mark'],['MDL','🇲🇩 Moldovan Leu'],['UAH','🇺🇦 Ukrainian Hryvnia'],
  ['TRY','🇹🇷 Turkish Lira'],
];
const middleEastCurrencies = [
  ['IQD','🇮🇶 Iraqi Dinar'],['AED','🇦🇪 UAE Dirham'],['SAR','🇸🇦 Saudi Riyal'],
  ['QAR','🇶🇦 Qatari Riyal'],['KWD','🇰🇼 Kuwaiti Dinar'],['BHD','🇧🇭 Bahraini Dinar'],
  ['OMR','🇴🇲 Omani Rial'],['JOD','🇯🇴 Jordanian Dinar'],['ILS','🇮🇱 Israeli Shekel'],
  ['LBP','🇱🇧 Lebanese Pound'],['SYP','🇸🇾 Syrian Pound'],['YER','🇾🇪 Yemeni Rial'],
  ['IRR','🇮🇷 Iranian Rial'],
];
const allCurrencies = [
  ['USD','🇺🇸 United States Dollar'],
  ['CAD','🇨🇦 Canadian Dollar'],
  ...europeCurrencies,
  ...middleEastCurrencies,
];
const PREVIEW_COUNT = 10;

/* ─── tiny helpers ───────────────────────────────────────── */
function Tag({ children, color = 'gold' }) {
  const palettes = {
    gold:  'bg-amber-400/15 text-amber-500 border border-amber-400/30',
    blue:  'bg-sky-400/10  text-sky-400  border border-sky-400/20',
    green: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
  };
  return (
    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.18em] ${palettes[color]}`}>
      {children}
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── CurrencyTicker ─────────────────────────────────────── */
function CurrencyTicker({ rates }) {
  const pairs = ['EUR','GBP','IQD','AED','CAD','CHF','SAR','JPY','TRY'];
  const items = pairs.map(c => `1 USD = ${rates?.[c]?.toFixed(4) ?? '…'} ${c}`);
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-amber-400 text-black text-xs font-bold py-2">
      <div className="flex gap-8 animate-ticker whitespace-nowrap">
        {doubled.map((t, i) => (
          <span key={i} className="shrink-0 tracking-wider">
            {t} <span className="opacity-40 mx-2">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── LiveRateCard ───────────────────────────────────────── */
function LiveRateCard({ name, code, flag, rate }) {
  const loaded = rate != null;
  return (
    <div className="group relative overflow-hidden border border-white/8 rounded-2xl p-6 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-500 cursor-default">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 60% 40%, rgba(251,191,36,0.07) 0%, transparent 70%)' }} />
      <div className="text-3xl mb-3">{flag}</div>
      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-1">{name}</p>
      <p className="text-3xl font-black text-white leading-none">
        {loaded
          ? rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
          : <span className="text-white/20 text-2xl animate-pulse">···</span>}
      </p>
      <p className="text-white/30 text-[11px] mt-1">per 1 USD → {code}</p>
    </div>
  );
}

/* ─── TrustPillar ────────────────────────────────────────── */
function TrustPillar({ num, icon, title, body }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
         style={{ transitionDelay: `${num * 120}ms` }}>
      <div className="text-amber-400/30 font-black text-6xl leading-none select-none mb-4">{String(num).padStart(2,'0')}</div>
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-white/45 text-sm leading-7">{body}</p>
    </div>
  );
}

/* ─── RateRow ────────────────────────────────────────────── */
function RateRow({ code, label, rates }) {
  const val = code === 'USD' ? 1 : rates?.[code];
  return (
    <div className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group cursor-default">
      <div>
        <p className="font-semibold text-slate-800 text-sm">{label}</p>
        <p className="text-slate-400 text-xs mt-0.5 font-mono">{code}</p>
      </div>
      <p className="font-black text-slate-900 text-base font-mono group-hover:text-amber-600 transition-colors">
        {val != null ? val.toFixed(4) : <span className="text-slate-300 animate-pulse">··</span>}
      </p>
    </div>
  );
}

function RatesBlock({ title, badge, currencies, rates }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? currencies : currencies.slice(0, PREVIEW_COUNT);
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <Tag color="blue">{badge}</Tag>
        <h3 className="text-xl font-black text-slate-900">{title}</h3>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden px-2 py-1">
        {rates
          ? visible.map(([code, label]) => <RateRow key={code} code={code} label={label} rates={rates} />)
          : Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div key={i} className="h-14 mx-2 my-1 bg-slate-100 rounded-lg animate-pulse" />
            ))}
      </div>
      {currencies.length > PREVIEW_COUNT && rates && (
        <button onClick={() => setExpanded(v => !v)}
          className="mt-4 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors tracking-widest uppercase">
          {expanded ? '↑ Show Less' : `↓ Show ${currencies.length - PREVIEW_COUNT} More`}
        </button>
      )}
    </div>
  );
}

/* ─── NewsCard ───────────────────────────────────────────── */
function NewsCard({ article, index }) {
  const [ref, vis] = useInView(0.1);
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  return (
    <a ref={ref} href={article.url} target="_blank" rel="noopener noreferrer"
      className={`group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden
                  ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="h-44 overflow-hidden bg-gradient-to-br from-[#08164a] to-[#0d1f63] flex items-center justify-center">
        {article.image_url
          ? <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={e => { e.target.parentElement.innerHTML = '<span style="font-size:2.5rem">📰</span>'; }} />
          : <span className="text-5xl">📰</span>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-widest truncate max-w-[65%]">
            {article.source || 'News'}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">{date}</span>
        </div>
        <h3 className="font-bold text-slate-800 text-sm leading-6 flex-1 group-hover:text-[#08164a] transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-slate-400 text-xs leading-5 mt-3 line-clamp-2">{article.description}</p>
        )}
        <div className="mt-4 text-xs font-black text-[#08164a] group-hover:text-amber-500 transition-colors">Read more →</div>
      </div>
    </a>
  );
}

/* ─── EscrowStep ─────────────────────────────────────────── */
function EscrowStep({ icon, num, text, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={`text-center transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
         style={{ transitionDelay: `${delay}ms` }}>
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-amber-200">
        {icon}
      </div>
      <p className="text-amber-500 font-black text-xs tracking-[0.2em] mb-2 uppercase">Step {num}</p>
      <p className="text-slate-600 text-sm leading-6 max-w-[180px] mx-auto">{text}</p>
    </div>
  );
}

/* ─── Home ───────────────────────────────────────────────── */
export default function Home() {
  const { t } = useTranslation();

  const [amount, setAmount]     = useState(1);
  const [from, setFrom]         = useState('USD');
  const [to, setTo]             = useState('IQD');
  const [converted, setConverted] = useState(null);
  const [rates, setRates]       = useState(null);
  const [news, setNews]         = useState(null);

  useEffect(() => {
  if (!amount || Number(amount) <= 0) return;

  fetch(`${API_URL}/api/convert?from=${from}&to=${to}&amount=${amount}`)
    .then((r) => {
      if (!r.ok) throw new Error("Failed to convert currency");
      return r.json();
    })
    .then((data) => {
      console.log("Converted data:", data);
      setConverted(data);
    })
    .catch((err) => {
      console.error("Convert fetch error:", err);
      setConverted(null);
    });
}, [amount, from, to]);

  useEffect(() => {
    setNews([
      { title: 'Global markets rally as inflation cools', description: 'Stocks rise worldwide as inflation shows signs of slowing.', url: 'https://www.reuters.com/markets/', source: 'Reuters', image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600', published_at: new Date() },
      { title: 'Oil prices impact Middle East economies', description: 'Energy markets continue to shape regional economies.', url: 'https://www.aljazeera.com/economy/', source: 'Al Jazeera', image_url: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600', published_at: new Date() },
      { title: 'European Central Bank updates policy', description: 'ECB announces new interest rate strategy.', url: 'https://www.bbc.com/news/business', source: 'BBC', image_url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600', published_at: new Date() },
    ]);
  }, []);

  const [aboutRef, aboutVis]   = useInView();
  const [convRef,  convVis]    = useInView();

  return (
    <div className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* ── Ticker ── */}
      <CurrencyTicker rates={rates} />

      {/* ── Hero ── */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* ── Market Live ── */}
      <MarketLiveSection />

      {/* ── About ── */}
      <section id="about-us" className="py-28 bg-white">
        <div ref={aboutRef} className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* text */}
          <div className={`transition-all duration-700 ${aboutVis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <Tag color="gold">About Us</Tag>
            <h2 className="text-5xl font-black leading-tight mt-4 mb-5 tracking-tight">{t('aboutUs')}</h2>
            <p className="text-slate-500 leading-8 text-[17px]">{t('aboutText')}</p>
            <div className="mt-10 flex gap-3">
              <a href="#currency-converter"
                 className="bg-[#08164a] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#0d1f63] transition-colors">
                Try Converter
              </a>
              <a href="#inquiry-form"
                 className="border-2 border-slate-200 px-7 py-3.5 rounded-xl font-bold text-sm hover:border-slate-400 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* stat card */}
          <div className={`transition-all duration-700 delay-200 ${aboutVis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-10 text-black shadow-2xl shadow-amber-200">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-6 w-32 h-32 bg-black/10 rounded-full" />
              <p className="relative text-8xl font-black tracking-tight">13+</p>
              <p className="relative text-xl font-bold mt-2">{t('yearsBusiness')}</p>
              <p className="relative text-black/50 text-sm mt-1">Trusted exchange &amp; transfer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Rates ── */}
      <section className="py-20 bg-[#060e2b]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Tag color="gold">Live Rates</Tag>
              <h2 className="text-white text-3xl font-black mt-3">{t('usdComparedRates')}</h2>
            </div>
            <p className="text-white/25 text-xs font-mono">{t('liveRatesComparedUsd')}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <LiveRateCard name={t('iraqiDinar')}     code="IQD" flag="🇮🇶" rate={rates?.IQD} />
            <LiveRateCard name={t('canadianDollar')} code="CAD" flag="🇨🇦" rate={rates?.CAD} />
            <LiveRateCard name={t('euro')}            code="EUR" flag="🇪🇺" rate={rates?.EUR} />
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bg-[#08164a] text-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Tag color="gold">{t('whyTrustUs')}</Tag>
          <h2 className="text-5xl font-black mt-4 mb-16 max-w-md leading-tight tracking-tight">
            Why clients choose us.
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <TrustPillar num={1} icon="✅" title={t('trustedOffice')} body={t('trustedOfficeText')} />
            <TrustPillar num={2} icon="💱" title={t('fairRates')}    body={t('fairRatesText')}    />
            <TrustPillar num={3} icon="🔒" title={t('secureService')} body={t('secureServiceText')} />
          </div>
        </div>
      </section>

      {/* ── Converter ── */}
      <section id="currency-converter" className="py-28 bg-gradient-to-b from-[#050816] to-[#0d1f63]">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={convRef} className={`text-center mb-12 transition-all duration-700 ${convVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Tag color="gold">Live Exchange</Tag>
            <h1 className="text-5xl font-black text-white mt-4 mb-2 tracking-tight">{t('currencyConverter')}</h1>
            <p className="text-white/40 text-sm">{t('converterSubtitle')}</p>
          </div>

          <div className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-700 delay-200 ${convVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Amount', content: (
                  <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)}
                    className="text-3xl font-black outline-none w-full mt-1 text-slate-900 bg-transparent" />
                )},
                { label: 'From', content: (
                  <select value={from} onChange={e => setFrom(e.target.value)}
                    className="text-lg font-bold outline-none w-full mt-1 bg-white cursor-pointer">
                    {allCurrencies.map(([c, l]) => <option key={c} value={c}>{l}</option>)}
                  </select>
                )},
                { label: 'To', content: (
                  <select value={to} onChange={e => setTo(e.target.value)}
                    className="text-lg font-bold outline-none w-full mt-1 bg-white cursor-pointer">
                    {allCurrencies.map(([c, l]) => <option key={c} value={c}>{l}</option>)}
                  </select>
                )},
              ].map(({ label, content }) => (
                <div key={label} className="border-2 border-slate-100 focus-within:border-amber-400 rounded-2xl p-4 transition-colors">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</label>
                  {content}
                </div>
              ))}
            </div>

            <div className="mt-5 bg-gradient-to-br from-[#08164a] to-[#0d1f63] rounded-2xl p-6 text-white">
              <p className="text-white/40 text-[11px] uppercase tracking-widest font-bold">Converted Amount</p>
              <p className="text-5xl font-black mt-2 tracking-tight">
                {converted?.result != null
                  ? `${converted.result.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${to}`
                  : <span className="text-white/25 text-3xl animate-pulse">Loading…</span>}
              </p>
              {converted?.rate && (
                <p className="text-white/35 mt-2 text-sm font-mono">
                  1 {from} = {converted.rate.toFixed(6)} {to}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#send-money"
                 className="bg-amber-400 hover:bg-amber-300 text-black px-7 py-3 rounded-xl font-black text-sm transition-colors">
                {t('sendMoney')} →
              </a>
              <a href="#inquiry-form"
                 className="border-2 border-slate-200 hover:border-slate-400 px-7 py-3 rounded-xl font-bold text-sm transition-colors">
                {t('inquiry')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Rates ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Tag color="blue">All Rates</Tag>
          <h2 className="text-4xl font-black mt-3 mb-2 tracking-tight">Europe &amp; Middle East Rates</h2>
          <p className="text-slate-400 mb-12 text-sm">Live exchange rates vs 1 USD · Updated every 24 h</p>
          <RatesBlock title="European Currencies"    badge="Europe"      currencies={europeCurrencies}    rates={rates} />
          <RatesBlock title="Middle East Currencies" badge="Middle East" currencies={middleEastCurrencies} rates={rates} />
        </div>
      </section>

      {/* ── Escrow ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <Tag color="gold">Secure Transactions</Tag>
              <h2 className="text-4xl font-black mt-4 mb-5 tracking-tight">🔒 {t('escrowTitle')}</h2>
              <p className="text-slate-500 leading-8 mb-6">{t('escrowText')}</p>
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-5">
                <p className="text-slate-700 leading-7 text-sm">
                  <strong>✔ {t('secureService')}</strong> — {t('escrowTrustNote')}
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/escort.png" alt="Escrow Service" className="w-full h-[350px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['🤝','1',t('escrowStepOne')],
              ['📝','2',t('escrowStepTwo')],
              ['🏦','3',t('escrowStepThree')],
              ['💵','4',t('escrowStepFour')],
            ].map(([icon, num, text]) => (
              <EscrowStep key={num} icon={icon} num={num} text={text} delay={Number(num) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section id="economy-news" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Tag color="green">Latest News</Tag>
          <h2 className="text-4xl font-black mt-3 mb-2 tracking-tight">Economy &amp; Finance News</h2>
          <p className="text-slate-400 mb-10 text-sm">Stay updated with the latest global financial news.</p>

          {!news
            ? <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                    <div className="h-44 bg-slate-200 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-slate-200 rounded animate-pulse w-1/3" />
                      <div className="h-4 bg-slate-200 rounded animate-pulse" />
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            : <div className="grid md:grid-cols-3 gap-6">
                {news.map((article, i) => <NewsCard key={article.uuid ?? i} article={article} index={i} />)}
              </div>}
        </div>
      </section>

      {/* ── Send Money ── */}
      <section id="send-money" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Tag color="green">Transfer</Tag>
          <h2 className="text-4xl font-black mt-3 mb-2 tracking-tight">{t('sendMoney')}</h2>
          <p className="text-slate-400 mb-10 max-w-2xl text-sm leading-7">{t('sendMoneyExplain')}</p>
          <SendMoneyForm />
        </div>
      </section>

      {/* ── Inquiry ── */}
      <section id="inquiry-form" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <InquiryForm />
        </div>
      </section>

      <Footer />

      {/* ── Global styles ── */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
