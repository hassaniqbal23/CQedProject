import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ModuleContext = createContext({ module: '' });

interface ModuleProviderProps {
  children: React.ReactNode;
}

const useModule = () => useContext(ModuleContext);

const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
  const [module, setModule] = useState('');
  const pathname = usePathname();

  const determineModule = (route: string | null) => {
    if (!route) return '';
    const modules = ['/students', '/teachers', '/schools'];
    const module = modules.find((m) => route.startsWith(m));
    setModule(module?.replace('/', '') || '');
  };

  useEffect(() => {
    determineModule(pathname);
  }, [pathname]);

  return (
    <ModuleContext.Provider value={{ module }}>
      {children}
    </ModuleContext.Provider>
  );
};

export { ModuleContext, ModuleProvider, useModule };
