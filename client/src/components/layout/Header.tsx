import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown, 
  CalculatorIcon, 
  Home, 
  Building2, 
  Package, 
  Download, 
  Phone,
  BookOpen,
  Info,
  Mail,
  Users,
  Briefcase
} from "lucide-react";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// URLs oficiais dos logos
const logoLight = "https://www.dropbox.com/scl/fi/3hjg3gcahqeiskzvgcxqp/Design-sem-nome-43.png?rlkey=thvxu22yqp6n7knif1y4tqzsj&st=x8zc7hpm&raw=1";
const logoWhite = "https://www.dropbox.com/scl/fi/5ruavod1yonbn8nfm5hgv/Design-sem-nome-44.png?rlkey=itk2xms0sw2jsh0bjwm0f00nu&st=864su6e6&raw=1";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, language } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  
  // Detecta o tema real (considerando o system theme)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');
    setActualTheme(isDark ? 'dark' : 'light');
    
    // Observer para mudanças de classe
    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains('dark');
      setActualTheme(isDark ? 'dark' : 'light');
    });
    
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProductSubMenu = () => {
    setProductSubMenuOpen(!productSubMenuOpen);
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 w-full border-b ${
        isScrolled 
          ? "bg-white/95 dark:bg-primary/95 backdrop-blur-sm shadow-sm border-slate-200/70 dark:border-slate-800/70" 
          : "bg-white dark:bg-primary border-slate-200 dark:border-slate-800"
      } transition-all duration-300`}
      itemScope itemType="http://schema.org/Organization"
    >
      {/* Barra superior com informações de contato e seletores - apenas desktop */}
      <div className="hidden md:block bg-slate-50 dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800/70 py-1.5">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <a 
              href="mailto:comercial@fbbombas.com.br" 
              className="flex items-center hover:text-[#E30613] transition-colors whitespace-nowrap"
              itemProp="email"
            >
              <Mail className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>comercial@fbbombas.com.br</span>
            </a>
            <a 
              href="tel:+5511999876316" 
              className="flex items-center hover:text-[#E30613] transition-colors whitespace-nowrap"
              itemProp="telephone"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>(11) 99987-6316</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button 
              onClick={toggleTheme} 
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-primary-foreground/10 transition-colors focus:outline-none"
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-primary-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu principal */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#inicio" 
            className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] rounded-md"
            aria-label="FB Bombas - Página inicial"
            itemProp="url"
          >
            <div className="w-auto h-8 sm:h-10 md:h-14 transition-transform hover:scale-105 duration-300">
              <img 
                src={actualTheme === 'dark' ? logoWhite : logoLight} 
                alt="FB Bombas Logo" 
                className="h-full w-auto object-contain" 
                loading="eager"
                fetchPriority="high"
                itemProp="logo"
              />
            </div>
            <meta itemProp="name" content="FB Bombas" />
          </a>

          {/* Mobile menu - Apenas logo e hamburguer */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={t('nav.menu')}
              aria-expanded={mobileMenuOpen}
              className="text-primary dark:text-primary-foreground"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center justify-end flex-1 space-x-1 lg:space-x-2 xl:space-x-3" aria-label="Navegação principal">
            <a 
              href="/#inicio" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#inicio';
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-primary dark:text-primary-foreground hover:text-[#E30613] dark:hover:text-[#E30613]",
                "hover:bg-slate-100 dark:hover:bg-primary-foreground/10 font-medium transition-all duration-200"
              )}
            >
              <Home className="w-4 h-4 mr-2" />
              <span>{t('nav.home')}</span>
            </a>
            <a 
              href="/#empresa" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#empresa';
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-primary dark:text-primary-foreground hover:text-[#E30613] dark:hover:text-[#E30613]",
                "hover:bg-slate-100 dark:hover:bg-primary-foreground/10 font-medium transition-all duration-200"
              )}
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span>{t('nav.history', 'Nossa História')}</span>
            </a>
            <div className="relative group">
              <a 
                href="/produtos" 
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-primary dark:text-primary-foreground hover:text-[#E30613] dark:hover:text-[#E30613]",
                  "hover:bg-slate-100 dark:hover:bg-primary-foreground/10 font-medium transition-all duration-200"
                )}
              >
                <img 
                  src="https://www.dropbox.com/scl/fi/cxo5b8r77mxmaixocg0id/Design-sem-nome-90.svg?rlkey=1ur8rr36s8y6xjch4cfuak6rk&st=i7fb4933&raw=1"
                  alt=""
                  className="w-[18px] h-[18px] mr-2 dark:brightness-0 dark:invert"
                />
                <span>{t('nav.products')}</span>
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </a>
              <div className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-[60]">
                <div className="py-2">
                  <a 
                    href="/produtos"
                    className="flex items-center px-4 py-2.5 text-sm font-medium text-primary dark:text-primary-foreground hover:bg-slate-100 hover:text-[#E30613] dark:hover:bg-slate-800/60 dark:hover:text-[#E30613]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E30613] mr-2.5"></span>
                    {t('products.all_models', 'Todos os Modelos')}
                  </a>
                  <div className="my-1 border-t border-slate-200 dark:border-slate-800"></div>
                  <a 
                    href="/bombas-de-engrenagem" 
                    className="flex items-center px-4 py-2.5 text-sm text-primary dark:text-primary-foreground hover:bg-slate-100 hover:text-[#E30613] dark:hover:bg-slate-800/60 dark:hover:text-[#E30613]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#003087] mr-2.5"></span>
                    {t('products.gear_pumps', 'Bombas de Engrenagem (FBE)')}
                  </a>
                  <a 
                    href="/bombas-centrifugas" 
                    className="flex items-center px-4 py-2.5 text-sm text-primary dark:text-primary-foreground hover:bg-slate-100 hover:text-[#E30613] dark:hover:bg-slate-800/60 dark:hover:text-[#E30613]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#003087] mr-2.5"></span>
                    {t('products.centrifugal_pumps', 'Bombas Centrífugas')}
                  </a>
                </div>
              </div>
            </div>

            <a 
              href="/#downloads" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#downloads';
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-primary dark:text-primary-foreground hover:text-[#E30613] dark:hover:text-[#E30613]",
                "hover:bg-slate-100 dark:hover:bg-primary-foreground/10 font-medium transition-all duration-200"
              )}
            >
              <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{t('nav.downloads')}</span>
            </a>
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector('section.work-with-us-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/';
                  setTimeout(() => {
                    const workSection = document.querySelector('section.work-with-us-section');
                    if (workSection) {
                      workSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 500);
                }
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-primary dark:text-primary-foreground hover:text-[#E30613] dark:hover:text-[#E30613]",
                "hover:bg-slate-100 dark:hover:bg-primary-foreground/10 font-medium transition-all duration-200"
              )}
            >
              <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{t('nav.careers', 'Trabalhe Conosco')}</span>
            </a>
          </nav>
          
          <a 
            href="/#contato" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#contato';
            }}
            className="hidden md:flex ml-2 lg:ml-3 bg-[#E30613] hover:bg-[#c60411] text-white rounded-md px-4 py-2 font-medium transition-colors duration-200 items-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>{t('nav.contact')}</span>
          </a>
        </div>
      </div>

      {/* Mobile menu - Dropdown completo com largura total e 70% altura */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ease-out",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ height: mobileMenuOpen ? '70vh' : '0' }}
      >
        <div className="w-full h-full bg-white dark:bg-slate-950 shadow-2xl border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col h-full">
            {/* Header do menu */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center">
                <div className="h-8 w-auto mr-3">
                  <img 
                    src={actualTheme === 'dark' ? logoWhite : logoLight} 
                    alt="FB Bombas" 
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{t('nav.menu')}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t('nav.close_menu')}
                className="text-slate-500 dark:text-white hover:text-slate-900 dark:hover:text-slate-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Navegação principal */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-2">
                
                {/* Home */}
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === '/') {
                      const element = document.getElementById('inicio');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = '/#inicio';
                    }
                  }}
                  className="flex items-center py-4 px-4 text-base font-medium rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 w-full text-left"
                >
                  <Home className="w-6 h-6 mr-4 text-[#E30613] dark:text-white" />
                  <span>{t('nav.home')}</span>
                </button>
                
                {/* Empresa */}
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === '/') {
                      const element = document.getElementById('empresa');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = '/#empresa';
                    }
                  }}
                  className="flex items-center py-4 px-4 text-base font-medium rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 w-full text-left"
                >
                  <Building2 className="w-6 h-6 mr-4 text-[#E30613] dark:text-white" />
                  <span>{t('nav.history')}</span>
                </button>
                
                {/* Produtos */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
                  <button 
                    className="flex justify-between items-center w-full py-2 px-2 text-base font-medium text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                    onClick={toggleProductSubMenu}
                    aria-expanded={productSubMenuOpen}
                  >
                    <div className="flex items-center">
                      <img 
                        src="https://www.dropbox.com/scl/fi/cxo5b8r77mxmaixocg0id/Design-sem-nome-90.svg?rlkey=1ur8rr36s8y6xjch4cfuak6rk&st=i7fb4933&raw=1"
                        alt=""
                        className="w-6 h-6 mr-4 dark:brightness-0 dark:invert"
                      />
                      <span>{t('nav.products')}</span>
                    </div>
                    <ChevronDown className={cn(
                      "h-5 w-5 text-slate-600 dark:text-white transition-transform duration-200",
                      productSubMenuOpen ? 'rotate-180' : ''
                    )} />
                  </button>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    productSubMenuOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
                  )}>
                    <div className="space-y-2 pl-4">
                      <a 
                        href="/produtos"
                        className="flex items-center py-3 px-3 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-[#E30613] dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#E30613] dark:bg-white mr-3"></span>
                        <span className="font-medium">{t('products.all_models', 'Todos os Modelos')}</span>
                      </a>
                      
                      <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
                      
                      <a 
                        href="/produtos/bombas-engrenagem" 
                        className="flex items-center py-3 px-3 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-[#E30613] dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#003087] dark:bg-white mr-3"></span>
                        <span>{t('products.gear_pumps', 'Bombas de Engrenagem')}</span>
                      </a>
                      
                      <a 
                        href="/produtos/bombas-centrifugas" 
                        className="flex items-center py-3 px-3 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-[#E30613] dark:hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#003087] dark:bg-white mr-3"></span>
                        <span>{t('products.centrifugal_pumps', 'Bombas Centrífugas')}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Downloads */}
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === '/') {
                      const element = document.getElementById('downloads');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = '/#downloads';
                    }
                  }}
                  className="flex items-center py-4 px-4 text-base font-medium rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 w-full text-left"
                >
                  <BookOpen className="w-6 h-6 mr-4 text-[#E30613] dark:text-white" />
                  <span>{t('nav.downloads')}</span>
                </button>
                
                {/* Trabalhe Conosco */}
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === '/') {
                      const section = document.querySelector('section.work-with-us-section');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = '/';
                      setTimeout(() => {
                        const workSection = document.querySelector('section.work-with-us-section');
                        if (workSection) {
                          workSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 500);
                    }
                  }}
                  className="flex items-center py-4 px-4 text-base font-medium rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 w-full text-left"
                >
                  <Briefcase className="w-6 h-6 mr-4 text-[#E30613] dark:text-white" />
                  <span>{t('nav.careers')}</span>
                </button>
              </div>
            </nav>
            
            {/* Rodapé do menu com contato e configurações */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
              
              {/* Botão de contato principal */}
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === '/') {
                      const element = document.getElementById('contato');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = '/#contato';
                    }
                  }}
                  className="w-full bg-[#E30613] hover:bg-[#c60411] text-white py-3 px-4 rounded-lg font-medium shadow-lg transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{t('nav.contact')}</span>
                </Button>
              </div>
              
              {/* Informações de contato e configurações */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a 
                    href="mailto:comercial@fbbombas.com.br" 
                    className="flex items-center text-xs text-slate-600 dark:text-slate-400 hover:text-[#E30613] dark:hover:text-white transition-colors"
                  >
                    <Mail className="h-3 w-3 mr-2" />
                    comercial@fbbombas.com.br
                  </a>
                  <a 
                    href="tel:+5511999876316" 
                    className="flex items-center text-xs text-slate-600 dark:text-slate-400 hover:text-[#E30613] dark:hover:text-white transition-colors"
                  >
                    <Phone className="h-3 w-3 mr-2" />
                    (11) 99987-6316
                  </a>
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  <LanguageSelector />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="h-8 w-8 p-0 text-slate-500 dark:text-white hover:text-slate-900 dark:hover:text-slate-300"
                    aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop para o menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Progress bar - indicador de progresso de rolagem sofisticado */}
      <div className="h-0.5 bg-[#E30613]/20 w-full relative overflow-hidden">
        <div className="scroll-progress-indicator absolute top-0 left-0 h-full bg-[#E30613] w-0"></div>
      </div>
    </header>
  );
};

export default Header;