import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fpTheme');
    setDark(stored === 'dark');

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('fpTheme', next ? 'dark' : 'light');
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Over the dark hero: white text. Once scrolled: dark text on frosted glass.
  const onHero = !scrolled;
  const linkColor = onHero ? 'rgba(246,243,236,0.85)' : undefined;
  const brandColor = onHero ? '#F6F3EC' : undefined;
  const toggleColor = onHero ? 'rgba(246,243,236,0.7)' : undefined;
  const toggleBorder = onHero ? 'rgba(246,243,236,0.3)' : undefined;
  const ctaBg = onHero ? '#F6F3EC' : undefined;
  const ctaColor = onHero ? '#14201C' : undefined;

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#top" className="brand" style={{ color: brandColor }}>
        <span className="brand-mark">F</span>
        <span>
          FotoProp <i style={{ fontStyle: 'italic', opacity: 0.7 }}>Studio</i>
        </span>
      </a>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <a href="#servicios" onClick={() => setMenuOpen(false)} style={{ color: linkColor }}>
          Servicios
        </a>
        <a href="#trabajos" onClick={() => setMenuOpen(false)} style={{ color: linkColor }}>
          Trabajos
        </a>
        <a href="#proceso" onClick={() => setMenuOpen(false)} style={{ color: linkColor }}>
          Proceso
        </a>
        <a href="#planes" onClick={() => setMenuOpen(false)} style={{ color: linkColor }}>
          Planes
        </a>
        <button
          className="cta-mini"
          onClick={() => scrollTo('cotizar')}
          style={{ background: ctaBg, color: ctaColor }}
        >
          Cotizar
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          className="theme-toggle"
          onClick={toggleDark}
          aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={dark ? 'Modo claro' : 'Modo oscuro'}
          style={{ color: toggleColor, borderColor: toggleBorder }}
        >
          {dark ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 1v1M7.5 13v1M1 7.5H0M15 7.5h-1M2.636 2.636l-.707-.707M13.071 13.071l-.707-.707M2.636 12.364l-.707.707M13.071 2.929l-.707.707M7.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12.5 9a6 6 0 1 1-7.5-7.5A5 5 0 0 0 12.5 9z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
          style={{ color: toggleColor, borderColor: toggleBorder }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path
              d="M1 1h14M1 6h14M1 11h14"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
