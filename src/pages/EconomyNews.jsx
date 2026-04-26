import { useTranslation } from 'react-i18next';

function EconomyNews() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t('economyNews')}
      </h1>

      <p className="text-gray-600">
        News will appear here...
      </p>
    </section>
  );
}

export default EconomyNews;