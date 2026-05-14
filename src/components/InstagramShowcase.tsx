import { useState, useEffect } from 'react';

const PHOTOS = {
  ig1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80&auto=format&fit=crop',
  ig2: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80&auto=format&fit=crop',
  ig3: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&auto=format&fit=crop',
};

const TOTAL_SLIDES = 4;

export default function InstagramShowcase() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % TOTAL_SLIDES), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="ig-section section-pad">
      <div className="container">
        <div className="ig-grid">
          {/* Left: features */}
          <div data-reveal="">
            <div className="eyebrow">Carruseles para Instagram</div>
            <h3
              className="ig-side serif"
              style={{ marginTop: 22 }}
            >
              Hechos para <em>detener el scroll</em> y abrir DMs.
            </h3>
            <p className="ig-side">
              Cada carrusel sigue una estructura probada: portada que captura, fotos que cuentan la
              propiedad y cierre con llamada a contactar. Listo para subir, en formato 4:5 que ocupa
              más pantalla.
            </p>
            <ul className="ig-feats">
              <li>
                <span>Portada con titular vendedor y datos clave</span>
                <span className="num serif">i</span>
              </li>
              <li>
                <span>Selección y orden óptimo de las mejores fotos</span>
                <span className="num serif">ii</span>
              </li>
              <li>
                <span>Slide editorial con metraje, valor y ubicación</span>
                <span className="num serif">iii</span>
              </li>
              <li>
                <span>Cierre con CTA y datos de contacto</span>
                <span className="num serif">iv</span>
              </li>
              <li>
                <span>Texto de pie listo, con hashtags locales</span>
                <span className="num serif">v</span>
              </li>
            </ul>
            <a href="#cotizar" className="btn btn-ink">
              Pedir carrusel <span className="btn-arrow" />
            </a>
          </div>

          {/* Right: phone mockup */}
          <div data-reveal="">
            <div className="ig-phone">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-notch" />
                  <div className="ig-bar">
                    <span>FotoProp Studio</span>
                    <span style={{ fontSize: 18 }}>+</span>
                  </div>

                  <div className="ig-post-head">
                    <div className="ig-avatar">
                      <div>F</div>
                    </div>
                    <div className="ig-handle">
                      fotoprop.studio
                      <small>Patrocinado · Santiago</small>
                    </div>
                    <div style={{ fontSize: 16, color: '#888' }}>···</div>
                  </div>

                  <div className="ig-carousel">
                    <div
                      className="ig-carousel-track"
                      style={{ transform: `translateX(-${slide * 25}%)` }}
                    >
                      {/* Slide 1: editorial */}
                      <div className="ig-slide editorial">
                        <div className="ig-slide-num">1 / 4</div>
                        <div className="e-label">Departamento · Las Condes</div>
                        <div className="e-title serif">
                          78 m² <em>con vista poniente.</em>
                        </div>
                        <div className="e-meta">
                          <span>3D · 2B · Terraza</span>
                          <span>UF 5.490</span>
                        </div>
                      </div>

                      {/* Slide 2 */}
                      <div className="ig-slide">
                        <div className="ig-slide-num">2 / 4</div>
                        <img src={PHOTOS.ig1} alt="" loading="lazy" />
                      </div>

                      {/* Slide 3 */}
                      <div className="ig-slide">
                        <div className="ig-slide-num">3 / 4</div>
                        <img src={PHOTOS.ig2} alt="" loading="lazy" />
                      </div>

                      {/* Slide 4 */}
                      <div className="ig-slide">
                        <div className="ig-slide-num">4 / 4</div>
                        <img src={PHOTOS.ig3} alt="" loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className="ig-actions">
                    <div style={{ display: 'flex', gap: 14 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                  </div>

                  <div className="ig-dots">
                    {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                      <span
                        key={i}
                        className={i === slide ? 'active' : ''}
                        onClick={() => setSlide(i)}
                      />
                    ))}
                  </div>

                  <div className="ig-caption">
                    <b>fotoprop.studio</b> Departamento luminoso en Las Condes, listo para mudarse.
                    Terraza poniente con vista despejada y excelente conectividad…
                    <span className="meta">Hace 2 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
