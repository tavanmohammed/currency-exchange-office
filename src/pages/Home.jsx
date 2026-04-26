import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSlider from '../components/HeroSlider';
import MarketLiveSection from '../components/MarketLiveSection';
import InquiryForm from '../components/InquiryForm';
import SendMoneyForm from '../components/SendMoneyForm';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL;

function StatCard({ value, label, sub }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-yellow-600 rounded-3xl p-8 text-black shadow-2xl">
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-black/10 rounded-full" />
      <p className="relative text-7xl font-black tracking-tight">{value}</p>
      <p className="relative text-lg font-bold mt-2">{label}</p>
      {sub && <p className="relative text-black/60 text-sm mt-1">{sub}</p>}
    </div>
  );
}

function TrustCard({ icon, title, body }) {
  return (
    <div className="group bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-3xl p-7 border border-white/10 hover:border-amber-400/40">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-bold text-xl mt-4 mb-2">{title}</h3>
      <p className="text-white/60 leading-7 text-sm">{body}</p>
    </div>
  );
}

function CurrencyCompareCard({ name, code, rate, icon }) {
  const loaded = rate !== null && rate !== undefined;

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-3xl p-6 flex items-center gap-5">
      <div className="text-4xl">{icon}</div>
      <div className="flex-1">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
          {name}
        </p>
        <p className="text-2xl font-black text-white mt-1">
          {loaded ? (
            `${rate.toLocaleString('en-US', {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })} ${code}`
          ) : (
            <span className="text-white/30 animate-pulse">Loading…</span>
          )}
        </p>
        <p className="text-white/40 text-xs mt-0.5">Per 1 USD</p>
      </div>
    </div>
  );
}

function NewsCard({ article }) {
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {article.image_url ? (
        <div className="h-44 overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.parentElement.style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-br from-[#08164a] to-[#0d1f63] flex items-center justify-center">
          <span className="text-4xl">📰</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full truncate max-w-[60%]">
            {article.source || 'News'}
          </span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <h3 className="font-bold text-slate-800 leading-6 text-sm group-hover:text-[#08164a] transition-colors flex-1">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-gray-500 text-xs leading-5 mt-3 line-clamp-2">
            {article.description}
          </p>
        )}

        <div className="mt-4 text-xs font-bold text-[#08164a] group-hover:text-amber-600 transition-colors">
          Read more →
        </div>
      </div>
    </a>
  );
}

const europeCurrencies = [
  ['EUR', '🇪🇺 Euro'],
  ['GBP', '🇬🇧 British Pound'],
  ['CHF', '🇨🇭 Swiss Franc'],
  ['NOK', '🇳🇴 Norwegian Krone'],
  ['SEK', '🇸🇪 Swedish Krona'],
  ['DKK', '🇩🇰 Danish Krone'],
  ['PLN', '🇵🇱 Polish Zloty'],
  ['CZK', '🇨🇿 Czech Koruna'],
  ['HUF', '🇭🇺 Hungarian Forint'],
  ['RON', '🇷🇴 Romanian Leu'],
  ['BGN', '🇧🇬 Bulgarian Lev'],
  ['ISK', '🇮🇸 Icelandic Krona'],
  ['ALL', '🇦🇱 Albanian Lek'],
  ['RSD', '🇷🇸 Serbian Dinar'],
  ['MKD', '🇲🇰 Macedonian Denar'],
  ['BAM', '🇧🇦 Bosnia Convertible Mark'],
  ['MDL', '🇲🇩 Moldovan Leu'],
  ['UAH', '🇺🇦 Ukrainian Hryvnia'],
  ['TRY', '🇹🇷 Turkish Lira'],
];

const middleEastCurrencies = [
  ['IQD', '🇮🇶 Iraqi Dinar'],
  ['AED', '🇦🇪 UAE Dirham'],
  ['SAR', '🇸🇦 Saudi Riyal'],
  ['QAR', '🇶🇦 Qatari Riyal'],
  ['KWD', '🇰🇼 Kuwaiti Dinar'],
  ['BHD', '🇧🇭 Bahraini Dinar'],
  ['OMR', '🇴🇲 Omani Rial'],
  ['JOD', '🇯🇴 Jordanian Dinar'],
  ['ILS', '🇮🇱 Israeli Shekel'],
  ['LBP', '🇱🇧 Lebanese Pound'],
  ['SYP', '🇸🇾 Syrian Pound'],
  ['YER', '🇾🇪 Yemeni Rial'],
  ['IRR', '🇮🇷 Iranian Rial'],
];

const allCurrencies = [
  ['USD', '🇺🇸 United States Dollar'],
  ['CAD', '🇨🇦 Canadian Dollar'],
  ...europeCurrencies,
  ...middleEastCurrencies,
];

const PREVIEW_COUNT = 10;

function RateRow({ code, label, rates }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
      <div>
        <p className="font-bold text-sm">{label}</p>
        <p className="text-gray-400 text-xs mt-0.5">{code}</p>
      </div>

      <div className="text-right">
        <p className="font-black text-lg">
          {code === 'USD' ? '1.0000' : rates[code]?.toFixed(4) ?? 'N/A'}
        </p>
        <p className="text-gray-400 text-xs">{code} per $1</p>
      </div>
    </div>
  );
}

function RatesBlock({ title, badge, currencies, rates }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? currencies : currencies.slice(0, PREVIEW_COUNT);
  const hasMore = currencies.length > PREVIEW_COUNT;

  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {badge}
        </span>
        <h3 className="text-2xl font-black">{title}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {rates ? (
          visible.map(([code, label]) => (
            <RateRow key={code} code={code} label={label} rates={rates} />
          ))
        ) : (
          Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-2xl animate-pulse" />
          ))
        )}
      </div>

      {hasMore && rates && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-[#08164a] text-slate-700 hover:text-[#08164a] font-bold text-sm px-6 py-3 rounded-xl transition-all"
          >
            {expanded ? (
              <>Show Less ▲</>
            ) : (
              <>Read More — {currencies.length - PREVIEW_COUNT} more currencies ▼</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function Home() {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('IQD');
  const [converted, setConverted] = useState(null);
  const [rates, setRates] = useState(null);
  const [news, setNews] = useState(null);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    fetch('${API_URL}/api/currency')
      .then((r) => r.json())
      .then((d) => setRates(d.rates))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/convert?from=${from}&to=${to}&amount=${amount}`)
      .then((r) => r.json())
      .then(setConverted)
      .catch(console.error);
  }, [amount, from, to]);

    useEffect(() => {
  setNews([
    {
      title: "Global markets rally as inflation cools",
      description: "Stocks rise worldwide as inflation shows signs of slowing.",
      url: "https://www.reuters.com/markets/",
      source: "Reuters",
      image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
      published_at: new Date()
    },
      {
  title: "Oil prices impact Middle East economies",
  description: "Energy markets continue to shape regional economies.",
  url: "https://www.aljazeera.com/economy/",
  source: "Al Jazeera",
  image_url: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
  published_at: new Date()
},
    {
      title: "European Central Bank updates policy",
      description: "ECB announces new interest rate strategy.",
      url: "https://www.bbc.com/news/business",
      source: "BBC",
      image_url: "https://images.unsplash.com/photo-1559526324-593bc073d938",
      published_at: new Date()
    }
  ]);
}, []);

  return (
    <div className="bg-white text-slate-900 font-sans">
      <section id="home">
        <HeroSlider />
      </section>

      <MarketLiveSection />

      <section id="about-us" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              About Us
            </span>
            <h2 className="text-5xl font-black leading-tight mb-5">{t('aboutUs')}</h2>
            <p className="text-gray-500 leading-8 text-lg">{t('aboutText')}</p>

            <div className="mt-8 flex gap-3">
              <a href="#currency-converter" className="bg-[#08164a] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#0d1f63] transition">
                Try Converter
              </a>
              <a href="#inquiry-form" className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-sm hover:border-gray-500 transition">
                Contact Us
              </a>
            </div>
          </div>

          <StatCard value="13+" label={t('yearsBusiness')} sub="Trusted exchange and transfer service" />
        </div>
      </section>

      <section className="py-16 bg-[#08164a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Live Currency
            </span>
            <h2 className="text-white text-2xl font-bold">{t('usdComparedRates')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <CurrencyCompareCard name={t('iraqiDinar')} code="IQD" rate={rates?.IQD} icon="🇮🇶" />
            <CurrencyCompareCard name={t('canadianDollar')} code="CAD" rate={rates?.CAD} icon="🇨🇦" />
            <CurrencyCompareCard name={t('euro')} code="EUR" rate={rates?.EUR} icon="🇪🇺" />
          </div>

          <p className="text-white/30 text-xs mt-4">
            {t('liveRatesComparedUsd')}
          </p>
        </div>
      </section>

      <section className="bg-[#08164a] text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Why Us
          </span>
          <h2 className="text-4xl font-black mb-12">{t('whyTrustUs')}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <TrustCard icon="✅" title={t('trustedOffice')} body={t('trustedOfficeText')} />
            <TrustCard icon="💱" title={t('fairRates')} body={t('fairRatesText')} />
            <TrustCard icon="🔒" title={t('secureService')} body={t('secureServiceText')} />
          </div>
        </div>
      </section>

      <section id="currency-converter" className="bg-gradient-to-b from-[#050816] to-[#0d1f63] py-24 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Live Exchange
            </span>
            <h1 className="text-5xl font-black mb-3">{t('currencyConverter')}</h1>
            <p className="text-white/50">{t('converterSubtitle')}</p>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-gray-100 focus-within:border-amber-400 rounded-2xl p-4 transition-colors">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Amount</label>
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-3xl font-black outline-none w-full mt-2 text-slate-900"
                />
              </div>

              <div className="border-2 border-gray-100 focus-within:border-amber-400 rounded-2xl p-4 transition-colors">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest">From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="text-xl font-bold outline-none w-full mt-2 bg-white cursor-pointer">
                  {allCurrencies.map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="border-2 border-gray-100 focus-within:border-amber-400 rounded-2xl p-4 transition-colors">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest">To</label>
                <select value={to} onChange={(e) => setTo(e.target.value)} className="text-xl font-bold outline-none w-full mt-2 bg-white cursor-pointer">
                  {allCurrencies.map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-[#08164a] to-[#0d1f63] rounded-2xl p-6 text-white">
              <p className="text-white/50 text-sm uppercase tracking-widest font-semibold">
                Converted Amount
              </p>
              <p className="text-5xl font-black mt-2">
                {converted?.result != null ? (
                  `${converted.result.toLocaleString('en-US', {
                    maximumFractionDigits: 4,
                  })} ${to}`
                ) : (
                  <span className="text-white/30 text-3xl">Loading…</span>
                )}
              </p>
              {converted?.rate && (
                <p className="text-white/40 mt-2 text-sm">
                  1 {from} = {converted.rate.toFixed(6)} {to}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#send-money" className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-xl font-bold text-sm transition">
                {t('sendMoney')} →
              </a>
              <a href="#inquiry-form" className="border-2 border-gray-200 hover:border-gray-400 px-7 py-3 rounded-xl font-bold text-sm transition">
                {t('inquiry')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            All Rates
          </span>
          <h2 className="text-4xl font-black mb-2">Europe & Middle East Rates</h2>
          <p className="text-gray-400 mb-12 text-sm">
            Live exchange rates vs 1 USD. Updated every 24h.
          </p>

          <RatesBlock title="European Currencies" badge="Europe" currencies={europeCurrencies} rates={rates} />
          <RatesBlock title="Middle East Currencies" badge="Middle East" currencies={middleEastCurrencies} rates={rates} />
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                Secure Transactions
              </span>
              <h2 className="text-4xl font-black mb-5">🔒 {t('escrowTitle')}</h2>
              <p className="text-gray-500 leading-8 mb-6">{t('escrowText')}</p>

              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5">
                <p className="text-gray-700 leading-7 text-sm">
                  <strong>✔ {t('secureService')}</strong> — {t('escrowTrustNote')}
                </p>
              </div>
            </div>

            <div className="relative">
              <img src="/escort.png" alt="Escrow Service" className="rounded-3xl shadow-2xl w-full h-[350px] object-cover" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              ['🤝', '01', t('escrowStepOne')],
              ['📝', '02', t('escrowStepTwo')],
              ['🏦', '03', t('escrowStepThree')],
              ['💵', '04', t('escrowStepFour')],
            ].map(([icon, num, text]) => (
              <div key={num} className="bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 shadow-sm p-7 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{icon}</div>
                <p className="text-amber-500 font-black text-2xl mb-3">{num}</p>
                <p className="text-gray-600 text-sm leading-6">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="economy-news" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            Latest News
          </span>
          <h2 className="text-4xl font-black mb-2">Economy & Finance News</h2>
          <p className="text-gray-400 mb-10 text-sm">
            Stay updated with the latest global financial news.
          </p>

          {newsError && <p className="text-red-400 text-sm">⚠ {newsError}</p>}

          {!news && !newsError && (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-44 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {news && (
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((article, i) => (
                <NewsCard key={article.uuid ?? i} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="send-money" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Transfer
          </span>
          <h2 className="text-4xl font-black mb-3">{t('sendMoney')}</h2>
          <p className="text-gray-400 mb-10 max-w-2xl text-sm leading-7">
            {t('sendMoneyExplain')}
          </p>
          <SendMoneyForm />
        </div>
      </section>

      <section id="inquiry-form" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
