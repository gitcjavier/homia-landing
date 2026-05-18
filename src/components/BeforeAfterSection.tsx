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
    before: `${BA_BASE}/living-before.webp`,
    after: `${BA_BASE}/living-after.webp`,
  },
  {
    key: 'cocina',
    caption: 'Cocina',
    before: `${BA_BASE}/cocina-before.webp`,
    after: `${BA_BASE}/cocina-after.webp`,
  },
  {
    key: 'dormitorio',
    caption: 'Dormitorio',
    before: `${BA_BASE}/dormitorio-before.webp`,
    after: `${BA_BASE}/dormitorio-after.webp`,
  },
  {
    key: 'oficina',
    caption: 'Oficina',
    before: `${BA_BASE}/oficina-before.webp`,
    after: `${BA_BASE}/oficina-after.webp`,
  },
];

type BAProps = {
  before: string;
  after: string;
};

function BASlider({ before, after }: BAProps) {
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
      className="ba-card slider"
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

export default function BeforeAfterSection() {
  return (
    <section className="ba-section section-pad" id="trabajos">
      <div className="container">
        <div className="s-head" data-reveal="">
          <h2 className="serif">
            Antes y <em>después.</em>
          </h2>
          <p className="s-intro">
            La diferencia entre una foto que pasa sin notarse y una que detiene el scroll. Mismo
            departamento, misma luz natural, otro nivel de presentación. Arrastra el divisor para
            comparar.
          </p>
        </div>

        <div className="ba-grid" data-reveal="">
          {ROOMS.map((room) => (
            <div key={room.key}>
              <BASlider before={room.before} after={room.after} />
              <div className="ba-caption">{room.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
