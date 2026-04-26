import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function MarketPriceCard({ title, subtitle, price, symbol, data }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">{price || 'Loading...'}</p>
          <p className="text-sm text-gray-500">{symbol}</p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`${title}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" hide />
            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#ca8a04"
              strokeWidth={3}
              fill={`url(#${title}-gradient)`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MarketPriceCard;