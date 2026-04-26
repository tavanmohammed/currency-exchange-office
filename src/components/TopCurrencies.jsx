import { useEffect, useState } from 'react';

function TopCurrencies() {
  const [rates, setRates] = useState(null);

  const currencies = [
    ['🇰🇼', 'Kuwaiti Dinar', 'KWD'],
    ['🇧🇭', 'Bahraini Dinar', 'BHD'],
    ['🇴🇲', 'Omani Rial', 'OMR'],
    ['🇯🇴', 'Jordanian Dinar', 'JOD'],
    ['🇬🇧', 'British Pound', 'GBP'],
    ['🇰🇾', 'Cayman Islands Dollar', 'KYD'],
    ['🇪🇺', 'Euro', 'EUR'],
    ['🇨🇭', 'Swiss Franc', 'CHF'],
    ['🇺🇸', 'US Dollar', 'USD'],
    ['🇨🇦', 'Canadian Dollar', 'CAD'],
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/currency')
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-3">
          Top 10 World Currency Prices
        </h2>

        <p className="text-gray-600 mb-8">
          Based on value compared to the US Dollar.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {currencies.map(([flag, name, code], index) => {
            const usdValue =
              code === 'USD'
                ? 1
                : rates?.[code]
                ? 1 / rates[code]
                : null;

            return (
              <div
                key={code}
                className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center border"
              >
                <div>
                  <p className="font-bold text-lg">
                    {index + 1}. {flag} {name}
                  </p>
                  <p className="text-gray-500">{code}</p>
                </div>

                <p className="font-bold text-xl">
                  {usdValue ? `$${usdValue.toFixed(3)}` : 'Loading...'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TopCurrencies;