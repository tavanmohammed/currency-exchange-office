import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT LOGO */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="Shabakt Naqdia Logo"
            className="h-60 w-auto object-contain"
          />

         
         <p className="text-xs text-gray-500 font-medium tracking-wide -ml-2">
  Transfer & Exchange Currency
</p>
          
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
          <a href="#home">{t('home')}</a>
          <a href="#currency-converter">{t('currencyConverter')}</a>
          <a href="#gold-price">{t('goldPrice')}</a>
          <a href="#economy-news">{t('economyNews')}</a>
          <a href="#about-us">{t('aboutUs')}</a>
          <a href="#inquiry-form">{t('inquiry')}</a>
          <a href="#send-money">{t('sendMoney')}</a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl leading-none"
            aria-label="Open menu"
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <nav className="lg:hidden bg-white border-t px-6 py-5 flex flex-col gap-4 text-base font-medium text-black">
          <a href="#home" onClick={closeMenu}>{t('home')}</a>
          <a href="#currency-converter" onClick={closeMenu}>{t('currencyConverter')}</a>
          <a href="#gold-price" onClick={closeMenu}>{t('goldPrice')}</a>
          <a href="#economy-news" onClick={closeMenu}>{t('economyNews')}</a>
          <a href="#about-us" onClick={closeMenu}>{t('aboutUs')}</a>
          <a href="#inquiry-form" onClick={closeMenu}>{t('inquiry')}</a>
          <a href="#send-money" onClick={closeMenu}>{t('sendMoney')}</a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
