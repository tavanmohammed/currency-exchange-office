import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTranslation } from 'react-i18next';

function DollarPriceChart() {
  const { t } = useTranslation();

  const data = [
    { day: 'Mon', price: 1308 },
    { day: 'Tue', price: 1310 },
    { day: 'Wed', price: 1307 },
    { day: 'Thu', price: 1312 },
    { day: 'Fri', price: 1315 },
    { day: 'Sat', price: 1311 },
    { day: 'Today', price: 1314 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-bold text-xl mb-2">
        🇺🇸 USD / 🇮🇶 IQD
      </h3>

      <p className="text-gray-500 mb-6">
        {t('dollarGraph')}
      </p>

      <p className="text-3xl font-bold text-yellow-600 mb-6">
        1 USD = 1314 IQD
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DollarPriceChart;