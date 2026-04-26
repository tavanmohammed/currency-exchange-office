import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    if (lang === 'ar' || lang === 'ckb') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lang;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="border rounded-lg px-3 py-2"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="ckb">کوردی</option>
    </select>
  );
}

export default LanguageSwitcher;