import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const nextLang = i18n.language === 'en' ? 'es' : 'en';
  const label = i18n.language === 'en' ? 'ES' : 'EN';

  const handleChangeLanguage = () => {
    i18n.changeLanguage(nextLang);
    localStorage.setItem("language", nextLang);
  };
  return (
    <Button 
    onClick={handleChangeLanguage}
      className="px-3 py-1 border-2 border-white rounded hover:bg-white hover:text-black transition-colors font-semi-bold"
    >
      {label}
    </Button>
  );
};

export default LanguageSelector;
