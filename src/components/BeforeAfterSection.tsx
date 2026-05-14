import { useState, useRef, useEffect } from 'react';

const PHOTOS = {
  ba1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85&auto=format&fit=crop',
  ba2: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000&q=85&auto=format&fit=crop',
  ba3: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&q=85&auto=format&fit=crop',
};

type Mode = 'slider' | 'toggle' | 'hover';

// ── Slider ──────────────────────────────────────────────────────────────────
function BASlider({
  image,
  className = '',
}: {
  image: string;
  className?: string;
}) {
  const [pct, setPct] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPct(p);
  };

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateFromClientX(x);
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(x);
    };
    const onUp = () => { dragging.current = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`ba-card slider ${className}`}
      style={{ '--pct': `${pct}%` } as React.CSSProperties}
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      <div className="ba-img ba-before">
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-img ba-after">
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-tag left">Antes</div>
      <div className="ba-tag right">Después</div>
      <div className="ba-handle" />
      <div className="ba-knob" />
    </div>
  );
}

// ── Toggle ───────────────────────────────────────────────────────────────────
function BAToggle({
  image,
  className = '',
}: {
  image: string;
  className?: string;
}) {
  const [view, setView] = useState<'before' | 'after'>('after');
  return (
    <div className={`ba-card toggle ${className}`}>
      <div className="ba-img ba-before">
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div
        className="ba-img ba-after"
        style={{
          '--show-after': view === 'after' ? 1 : 0,
          opacity: view === 'after' ? 1 : 0,
        } as React.CSSProperties}
      >
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-tag left">{view === 'after' ? 'Después' : 'Antes'}</div>
      <div className="ba-toggle-btns">
        <button className={view === 'before' ? 'active' : ''} onClick={() => setView('before')}>
          Antes
        </button>
        <button className={view === 'after' ? 'active' : ''} onClick={() => setView('after')}>
          Después
        </button>
      </div>
    </div>
  );
}

// ── Hover ────────────────────────────────────────────────────────────────────
function BAHover({
  image,
  className = '',
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={`ba-card hover ${className}`}>
      <div className="ba-img ba-before">
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-img ba-after">
        <img src={image} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-tag left">Pasa el cursor</div>
    </div>
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────────────
function BeforeAfter({
  mode,
  image,
  className,
}: {
  mode: Mode;
  image: string;
  className?: string;
}) {
  if (mode === 'toggle') return <BAToggle image={image} className={className} />;
  if (mode === 'hover') return <BAHover image={image} className={className} />;
  return <BASlider image={image} className={className} />;
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function BeforeAfterSection() {
  const [mode, setMode] = useState<Mode>('slider');

  return (
    <section className="ba-section section-pad" id="trabajos">
      <div className="container">
        <div className="s-head" data-reveal="">
          <h2 className="serif">
            Antes y <em>después.</em>
          </h2>
          <p className="s-intro">
            La diferencia entre una foto que pasa sin notarse y una que detiene el scroll. Mismo
            departamento, misma luz natural, otro nivel de presentación. Arrastra, toca o pasa el
            cursor según prefieras.
          </p>
        </div>

        <div className="ba-controls" data-reveal="">
          {(['slider', 'toggle', 'hover'] as Mode[]).map((m) => (
            <button
              key={m}
              className={mode === m ? 'active' : ''}
              onClick={() => setMode(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="ba-grid" data-reveal="">
          <div>
            <BeforeAfter mode={mode} image={PHOTOS.ba1} />
            <div className="ba-caption">Living principal · Las Condes, 78 m²</div>
          </div>
          <div className="ba-side">
            <div>
              <BeforeAfter mode={mode} image={PHOTOS.ba2} className="tall" />
              <div className="ba-caption">Dormitorio · Ñuñoa</div>
            </div>
            <div>
              <BeforeAfter mode={mode} image={PHOTOS.ba3} />
              <div className="ba-caption">Cocina · Providencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
