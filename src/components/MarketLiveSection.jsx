import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://currency-exchange-office.onrender.com';

const CARDS = [
  { title: 'USD / IQD', subtitle: 'Iraqi Dinar',      key: 'IQD', gradientId: 'grad-IQD' },
  { title: 'USD / CAD', subtitle: 'Canadian Dollar',  key: 'CAD', gradientId: 'grad-CAD' },
  { title: 'USD / EUR', subtitle: 'Euro',              key: 'EUR', gradientId: 'grad-EUR' },
  { title: 'USD / IRR', subtitle: 'Iranian Rial',      key: 'IRR', gradientId: 'grad-IRR' },
  { title: 'USD / TRY', subtitle: 'Turkish Lira',      key: 'TRY', gradientId: 'grad-TRY' },
  { title: 'USD / GBP', subtitle: 'British Pound',     key: 'GBP', gradientId: 'grad-GBP' },
];

function makeLiveChart(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return [];
  return [
    { time: '09:00', value: n * 0.996 },
    { time: '10:00', value: n * 1.002 },
    { time: '11:00', value: n * 0.999 },
    { time: '12:00', value: n * 1.004 },
    { time: '13:00', value: n * 1.001 },
    { time: '14:00', value: n * 1.006 },
    { time: 'Now',   value: n         },
  ];
}

/* ── Defined OUTSIDE MarketLiveSection so React never re-creates it ── */
function MarketCard({ title, subtitle, value, gradientId }) {
  const n = Number(value);
  const isValid = Number.isFinite(n) && n > 0;
  const chartData = makeLiveChart(n);
  const first = chartData[0]?.value;
  const last  = chartData[chartData.length - 1]?.value;
  const change = first && last ? ((last - first) / first) * 100 : 0;

  return (
    <div className="bg-[#0b1220] text-white rounded-3xl p-6 shadow-xl border border-white/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-white/50 text-sm">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">
            {isValid ? n.toFixed(4) : <span className="text-white/30 animate-pulse text-lg">···</span>}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-sm font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
        <span className="text-white/40 text-sm">Today</span>
      </div>

      {isValid ? (
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff12" />
            <XAxis dataKey="time" stroke="#ffffff55" fontSize={10} tick={{ fill: '#ffffff55' }} />
            <YAxis hide domain={['dataMin', 'dataMax']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', border: '1px solid #334155', borderRadius: '10px', color: 'white', fontSize: '12px' }}
              formatter={(val) => [Number(val).toFixed(4), 'Rate']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-40 flex items-center justify-center">
          <div className="w-full h-16 bg-white/5 rounded-xl animate-pulse" />
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
function MarketLiveSection() {
  const [rates, setRates]           = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    function fetchLiveData() {
      fetch(`${API_URL}/api/currency`)
        .then(res => { if (!res.ok) throw new Error('API failed'); return res.json(); })
        .then(data => {
          setRates(data.rates || {});
          setLastUpdated(new Date().toLocaleTimeString());
        })
        .catch(err => { console.error('Fetch error:', err); setRates({}); });
    }

    fetchLiveData();
    const id = setInterval(fetchLiveData, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 bg-[#050816]" id="market-analytics">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white">Live Market Dashboard</h2>
            <p className="text-white/50 mt-2">
              Live USD comparison with major currencies.
            </p>
          </div>
          <div className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">
            Updated: {lastUpdated || 'Loading…'}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map(({ title, subtitle, key, gradientId }) => (
            <MarketCard
              key={key}
              title={title}
              subtitle={subtitle}
              value={rates[key]}
              gradientId={gradientId}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default MarketLiveSection;
