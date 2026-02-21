import { useEffect, useState } from 'react';
import { HamburgerButton } from '@components/atoms/buttons/HamburgerButton';

export interface NavbarProps {
  title?: string;
  className?: string;
  lang?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, className = '', lang }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar when:
          // 1. At the top of the page (scrollY < 10)
          // 2. Scrolling up (currentScrollY < lastScrollY)
          if (currentScrollY < 10) {
            setIsVisible(true);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past 100px
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${className}`}
    >
      <div className="border-b shadow-sm bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-neutral-200 dark:border-neutral-700">
        <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <div className="shrink-0">
              <a
                href={lang === 'en-GB' ? '/en-GB/' : '/es-MX/'}
                className="text-2xl font-semibold tracking-tight transition-colors duration-200 text-neutral-900 dark:text-neutral-50 hover:text-primary dark:hover:text-primary"
              >
                {title}
              </a>
            </div>

            {/* Hamburger Button */}
            <div className="flex items-center">
              <HamburgerButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
