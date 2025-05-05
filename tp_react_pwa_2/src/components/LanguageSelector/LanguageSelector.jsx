import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const nextLang = i18n.language === 'en' ? 'es' : 'en';
  const label = i18n.language === 'en' ? 'ES' : 'EN';

  return (
    <button
      onClick={() => i18n.changeLanguage(nextLang)}
      className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition-colors"
    >
      {label}
    </button>
  );
};

export default LanguageSelector;
