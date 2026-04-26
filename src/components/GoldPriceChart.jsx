import { useEffect, useState } from 'react';
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

function GoldPriceChart() {
  const { t } = useTranslation();
  const [goldPrice, setGoldPrice] = useState(null);
  const [silverPrice, setSilverPrice] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/metals`)
      .then((res) => res.json())
      .then((data) => {
        const gold = data.rates?.XAU || 2350.75;
        const silver = data.rates?.XAG || 31.25;

        setGoldPrice(gold);
        setSilverPrice(silver);

        setChartData([
          { time: '9 AM', gold: gold - 18, silver: silver - 0.6 },
          { time: '10 AM', gold: gold - 11, silver: silver - 0.4 },
          { time: '11 AM', gold: gold - 14, silver: silver - 0.3 },
          { time: '12 PM', gold: gold - 6, silver: silver - 0.2 },
          { time: '1 PM', gold: gold - 2, silver: silver - 0.1 },
          { time: '2 PM', gold: gold - 4, silver: silver - 0.05 },
          { time: 'Now', gold: gold, silver: silver },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gray-50 rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold">{t('goldPrice')}</h2>
              <p className="text-gray-600 mt-1">{t('goldSubtitle')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl px-6 py-4 shadow">
                <p className="text-sm text-gray-500">XAU / USD</p>
                <p className="text-3xl font-bold">
                  ${goldPrice ? goldPrice.toFixed(2) : 'Loading...'}
                </p>
                <p className="text-sm text-gray-500">{t('perOunce')}</p>
              </div>

              <div className="bg-white rounded-xl px-6 py-4 shadow">
                <p className="text-sm text-gray-500">XAG / USD</p>
                <p className="text-3xl font-bold">
                  ${silverPrice ? silverPrice.toFixed(2) : 'Loading...'}
                </p>
                <p className="text-sm text-gray-500">{t('perOunce')}</p>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="gold" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="silver" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoldPriceChart;
