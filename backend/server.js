import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.get("/api/currency", async (req, res) => {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    if (!data.rates) {
      return res.status(400).json({ message: "Currency API failed" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Currency API error",
      detail: error.message,
    });
  }
});

app.get("/api/convert", async (req, res) => {
  try {
    const { from = "USD", to = "EUR", amount = 1 } = req.query;

    const response = await fetch(
      `https://open.er-api.com/v6/latest/${String(from).toUpperCase()}`
    );

    const data = await response.json();
    const target = String(to).toUpperCase();

    if (!data.rates || !data.rates[target]) {
      return res.status(400).json({
        message: "Invalid currency conversion",
      });
    }

    const rate = data.rates[target];

    res.json({
      from: String(from).toUpperCase(),
      to: target,
      amount: Number(amount),
      rate,
      result: Number(amount) * rate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Conversion error",
      detail: error.message,
    });
  }
});

app.get("/api/top-currencies", async (req, res) => {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    if (!data.rates) {
      return res.status(400).json({
        message: "Top currencies API failed",
      });
    }

    const list = [
      { flag: "🇰🇼", name: "Kuwaiti Dinar", code: "KWD" },
      { flag: "🇧🇭", name: "Bahraini Dinar", code: "BHD" },
      { flag: "🇴🇲", name: "Omani Rial", code: "OMR" },
      { flag: "🇯🇴", name: "Jordanian Dinar", code: "JOD" },
      { flag: "🇬🇧", name: "British Pound", code: "GBP" },
      { flag: "🇨🇭", name: "Swiss Franc", code: "CHF" },
      { flag: "🇪🇺", name: "Euro", code: "EUR" },
      { flag: "🇺🇸", name: "US Dollar", code: "USD" },
      { flag: "🇨🇦", name: "Canadian Dollar", code: "CAD" },
    ];

    const currencies = list
      .map(({ flag, name, code }) => {
        const rate = code === "USD" ? 1 : data.rates[code];

        return {
          flag,
          name,
          code,
          valueInUSD: rate ? Number((1 / rate).toFixed(6)) : null,
          ratePerUSD: rate ? Number(rate.toFixed(6)) : null,
        };
      })
      .sort((a, b) => (b.valueInUSD ?? 0) - (a.valueInUSD ?? 0));

    res.json({
      base: "USD",
      date: data.time_last_update_utc,
      currencies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Top currencies error",
      detail: error.message,
    });
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const key = process.env.NEWS_API_KEY;

    if (!key) {
      return res.status(500).json({
        message: "Missing NEWS_API_KEY in .env",
      });
    }

    const base = `https://api.marketaux.com/v1/news/all?api_token=${key}&language=en&filter_entities=true&limit=6`;

    const [usRes, euRes, meRes] = await Promise.allSettled([
      fetch(`${base}&countries=us&search=economy+finance+markets`).then((r) =>
        r.json()
      ),
      fetch(
        `${base}&countries=gb,de,fr,it,es,nl,ch,se,pl,at,be,pt,gr&search=economy+finance+markets`
      ).then((r) => r.json()),
      fetch(
        `${base}&countries=sa,ae,iq,kw,qa,bh,om,jo,eg,tr&search=economy+finance+markets`
      ).then((r) => r.json()),
    ]);

    const extract = (result) =>
      result.status === "fulfilled" && Array.isArray(result.value?.data)
        ? result.value.data
        : [];

    res.json({
      us: extract(usRes),
      europe: extract(euRes),
      middleEast: extract(meRes),
    });
  } catch (error) {
    res.status(500).json({
      message: "News API error",
      detail: error.message,
    });
  }
});

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});