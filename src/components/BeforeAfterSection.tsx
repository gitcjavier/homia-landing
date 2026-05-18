import { useState, useRef, useEffect } from 'react';

const BA_BASE = '/images/before-after';

type Room = {
  key: string;
  caption: string;
  before: string;
  after: string;
};

const ROOMS: Room[] = [
  {
    key: 'living',
    caption: 'Living',
    before: `${BA_BASE}/living-before.jpg`,
    after: `${BA_BASE}/living-after.png`,
  },
  {
    key: 'cocina',
    caption: 'Cocina',
    before: `${BA_BASE}/cocina-before.jpg`,
    after: `${BA_BASE}/cocina-after.png`,
  },
  {
    key: 'dormitorio',
    caption: 'Dormitorio',
    before: `${BA_BASE}/dormitorio-before.jpg`,
    after: `${BA_BASE}/dormitorio-after.png`,
  },
  {
    key: 'oficina',
    caption: 'Oficina',
    before: `${BA_BASE}/oficina-before.jpg`,
    after: `${BA_BASE}/oficina-after.png`,
  },
];

type Mode = 'slider' | 'toggle' | 'hover';

type BAProps = {
  before: string;
  after: string;
  className?: string;
};

// ── Slider ──────────────────────────────────────────────────────────────────
function BASlider({ before, after, className = '' }: BAProps) {
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
        <img src={before} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-img ba-after">
        <img src={after} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-tag left">Antes</div>
      <div className="ba-tag right">Después</div>
      <div className="ba-handle" />
      <div className="ba-knob" />
    </div>
  );
}

// ── Toggle ───────────────────────────────────────────────────────────────────
function BAToggle({ before, after, className = '' }: BAProps) {
  const [view, setView] = useState<'before' | 'after'>('after');
  return (
    <div className={`ba-card toggle ${className}`}>
      <div className="ba-img ba-before">
        <img src={before} alt="" draggable={false} loading="lazy" />
      </div>
      <div
        className="ba-img ba-after"
        style={{
          '--show-after': view === 'after' ? 1 : 0,
          opacity: view === 'after' ? 1 : 0,
        } as React.CSSProperties}
      >
        <img src={after} alt="" draggable={false} loading="lazy" />
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
function BAHover({ before, after, className = '' }: BAProps) {
  return (
    <div className={`ba-card hover ${className}`}>
      <div className="ba-img ba-before">
        <img src={before} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-img ba-after">
        <img src={after} alt="" draggable={false} loading="lazy" />
      </div>
      <div className="ba-tag left">Pasa el cursor</div>
    </div>
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────────────
function BeforeAfter({ mode, before, after, className }: BAProps & { mode: Mode }) {
  if (mode === 'toggle') return <BAToggle before={before} after={after} className={className} />;
  if (mode === 'hover') return <BAHover before={before} after={after} className={className} />;
  return <BASlider before={before} after={after} className={className} />;
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
          {ROOMS.map((room) => (
            <div key={room.key}>
              <BeforeAfter mode={mode} before={room.before} after={room.after} />
              <div className="ba-caption">{room.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
