import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const slides = [
  {
    image: '/hero1.jpg',
    title: 'heroSlide1Title',
    text: 'heroSlide1Text',
  },
  {
    image: '/hero2.jpg',
    title: 'heroSlide2Title',
    text: 'heroSlide2Text',
  },
  {
    image: '/hero3.jpg',
    title: 'heroSlide3Title',
    text: 'heroSlide3Text',
  },
];

function HeroSlider() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[540px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slides[current].image}
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

          <div className="absolute inset-0 flex items-center pt-28 md:pt-36">
            <div className="max-w-6xl mx-auto px-6 text-white w-full">
              <motion.div
                className="max-w-3xl"
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-5">
                  {t('transferExchangeCurrency')}
                </span>

                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                  {t(slides[current].title)}
                </h1>

                <p className="text-lg md:text-xl max-w-2xl text-gray-200 leading-8 mb-8">
                  {t(slides[current].text)}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#currency-converter"
                    className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-3 rounded-xl font-bold text-sm transition"
                  >
                    {t('currencyConverter')}
                  </a>

                  <a
                    href="#send-money"
                    className="border border-white/40 hover:border-white text-white px-7 py-3 rounded-xl font-bold text-sm transition"
                  >
                    {t('sendMoney')}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default HeroSlider;