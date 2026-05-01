import { useTranslation } from 'react-i18next';

function Footer() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ar' || i18n.language === 'ku';

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div
        className={`max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 ${
          isRTL ? 'text-right' : 'text-left'
        }`}
      >
        {/* COMPANY */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Shabakt Naqdia
          </h3>

          <p className="text-gray-300 leading-7">
            {t('footerText')}
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            {t('contact')}
          </h3>

          <div className="space-y-2 text-gray-300">
           

            <p>
  📞 {t('phone')}:
  <bdi className="inline-block mx-2" dir="ltr">
    {t('phone1')}
  </bdi>
</p>

<p>
  📞 {t('phone')}:
  <bdi className="inline-block mx-2" dir="ltr">
    {t('phone2')}
  </bdi>
</p>

            <p>
              📧 {t('email')}: 
              <span dir="ltr" className="inline-block mx-2 [unicode-bidi:isolate]">
                mr.ameer.mirza984@gmail.com
              </span>
            </p>

            <p>
              📍 {t('addressFull')}
            </p>
          </div>
        </div>

        {/* LOCATION / MAP */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            {t('location')}
          </h3>

          <p className="text-gray-300 mb-4">
            {t('visitOffice')}
          </p>

          <a
            href="https://maps.app.goo.gl/pKEPZW9hZ8eAs4JA7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold transition"
          >
            {t('openMap')}
          </a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
