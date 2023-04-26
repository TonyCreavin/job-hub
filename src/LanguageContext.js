import { createContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(false);

  const buttonHandler = () => {
    setLanguage(!language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        buttonHandler,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
