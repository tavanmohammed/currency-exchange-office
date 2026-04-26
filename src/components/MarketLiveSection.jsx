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

function MarketLiveSection() {
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLiveData = () => {
    fetch('${API_URL}/api/currency')
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLiveData();

    const interval = setInterval(fetchLiveData, 30000);

    return () => clearInterval(interval);
  }, []);

  const makeLiveChart = (value) => {
    const numberValue = Number(value);

    if (!numberValue || Number.isNaN(numberValue)) return [];

    return [
      { time: '09:00', value: numberValue * 0.996 },
      { time: '10:00', value: numberValue * 1.002 },
      { time: '11:00', value: numberValue * 0.999 },
      { time: '12:00', value: numberValue * 1.004 },
      { time: '13:00', value: numberValue * 1.001 },
      { time: '14:00', value: numberValue * 1.006 },
      { time: 'Now', value: numberValue },
    ];
  };

  const MarketCard = ({ title, subtitle, value, symbol, gradientId }) => {
    const numberValue = Number(value);
    const isValid = !Number.isNaN(numberValue) && numberValue > 0;

    const chartData = makeLiveChart(numberValue);
    const first = chartData[0]?.value;
    const last = chartData[chartData.length - 1]?.value;
    const change = first && last ? ((last - first) / first) * 100 : 0;

    return (
      <div className="bg-[#0b1220] text-white rounded-3xl p-6 shadow-xl border border-white/10">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-white/50 text-sm">{subtitle}</p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold">
              {isValid ? numberValue.toFixed(4) : 'Loading...'}
            </p>
            <p className="text-sm text-white/50">{symbol}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`text-sm font-bold ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)}%
          </span>
          <span className="text-white/40 text-sm">Today</span>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff12" />
              <XAxis dataKey="time" stroke="#ffffff55" fontSize={11} />
              <YAxis hide domain={['dataMin', 'dataMax']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: 'white',
                }}
                formatter={(val) => Number(val).toFixed(4)}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 5 }}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const MainGraph = ({ title, subtitle, value, symbol, gradientId }) => {
    const numberValue = Number(value);
    const isValid = !Number.isNaN(numberValue) && numberValue > 0;
    const chartData = makeLiveChart(numberValue);

    return (
      <div className="bg-[#0b1220] text-white rounded-3xl p-6 shadow-xl border border-white/10">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <p className="text-white/50">{subtitle}</p>
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold">
              {isValid ? numberValue.toFixed(4) : 'Loading...'}
            </p>
            <p className="text-white/50">{symbol}</p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff12" />
              <XAxis dataKey="time" stroke="#ffffff55" />
              <YAxis stroke="#ffffff55" domain={['dataMin', 'dataMax']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: 'white',
                }}
                formatter={(val) => Number(val).toFixed(4)}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#facc15"
                strokeWidth={4}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-[#050816]" id="market-analytics">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Live Market Dashboard
            </h2>
            <p className="text-white/50 mt-2">
              Live USD comparison with Iraqi Dinar, Canadian Dollar, and Euro.
            </p>
          </div>

          <div className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">
            Live Updated: {lastUpdated || 'Loading...'}
          </div>
        </div>
           <div className="grid md:grid-cols-3 gap-6">
  <MarketCard
    title="USD / IQD"
    subtitle="Iraqi Dinar"
    value={rates?.IQD}
    symbol="IQD"
    gradientId="iqdCardGradient"
  />

  <MarketCard
    title="USD / CAD"
    subtitle="Canadian Dollar"
    value={rates?.CAD}
    symbol="CAD"
    gradientId="cadCardGradient"
  />

  <MarketCard
    title="USD / EUR"
    subtitle="Euro"
    value={rates?.EUR}
    symbol="EUR"
    gradientId="eurCardGradient"
  />

  <MarketCard
    title="USD / IRR"
    subtitle="Iranian Rial"
    value={rates?.IRR}
    symbol="IRR"
    gradientId="irrCardGradient"
  />

  <MarketCard
    title="USD / TRY"
    subtitle="Turkish Lira"
    value={rates?.TRY}
    symbol="TRY"
    gradientId="tryCardGradient"
  />

  <MarketCard
    title="USD / GBP"
    subtitle="British Pound"
    value={rates?.GBP}
    symbol="GBP"
    gradientId="gbpCardGradient"
  />
</div>
      </div>
    </section>
  );
}

export default MarketLiveSection;
