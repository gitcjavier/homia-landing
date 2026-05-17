import { useState } from 'react';

type ServiceKey = 'edicion' | 'carrusel' | 'descripcion' | 'mercadolibre';

const SERVICES: { k: ServiceKey; t: string; sub: string }[] = [
  { k: 'edicion', t: 'Edición fotográfica', sub: 'Luz, color, líneas, encuadre' },
  { k: 'carrusel', t: 'Carrusel para Instagram', sub: '4 a 10 slides, formato 4:5' },
  { k: 'descripcion', t: 'Descripción persuasiva', sub: 'Texto listo para portales' },
  { k: 'mercadolibre', t: 'Adaptación Mercado Libre', sub: 'Archivos optimizados por portal' },
];

const COUNTS = ['1-15', '15-25', '25-40', '40+'];

export default function QuoteModule() {
  const [services, setServices] = useState<Record<ServiceKey, boolean>>({
    edicion: true,
    carrusel: false,
    descripcion: false,
    mercadolibre: false,
  });
  const [count, setCount] = useState('15-25');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (k: ServiceKey) =>
    setServices((s) => ({ ...s, [k]: !s[k] }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-pad quote-section" id="cotizar">
      <div className="container">
        <div className="s-head" data-reveal="">
          <h2 className="serif">
            Cotización <em>a tu medida.</em>
          </h2>
          <p className="s-intro">
            No vendemos paquetes cerrados. Cada propiedad es distinta y cada corredor publica en
            lugares distintos. Cuéntanos qué necesitas y te enviamos una propuesta clara, por
            escrito, en menos de tres horas hábiles.
          </p>
        </div>

        <div className="quote-grid" data-reveal="">
          <aside className="quote-aside">
            <div className="qa-block">
              <div className="eyebrow">Qué incluye toda cotización</div>
              <ul className="qa-list">
                <li>
                  <span className="qx serif">i.</span>
                  <span>Detalle del trabajo, cantidad de fotos y formato de entrega.</span>
                </li>
                <li>
                  <span className="qx serif">ii.</span>
                  <span>Tiempo de entrega comprometido por escrito.</span>
                </li>
                <li>
                  <span className="qx serif">iii.</span>
                  <span>Una ronda de revisión incluida, sin costo extra.</span>
                </li>
                <li>
                  <span className="qx serif">iv.</span>
                  <span>Descuento por volumen si trabajas con cartera.</span>
                </li>
              </ul>
            </div>

            <div className="qa-block">
              <div className="eyebrow">Tiempos habituales</div>
              <div className="qa-stats">
                <div>
                  <span className="qa-num serif">24h</span>
                  <span className="qa-lbl">Entrega estándar</span>
                </div>
                <div>
                  <span className="qa-num serif">3h</span>
                  <span className="qa-lbl">Respuesta a la cotización</span>
                </div>
              </div>
            </div>
          </aside>

          <form className="quote-form" onSubmit={onSubmit} noValidate>
            {!submitted ? (
              <>
                <div className="qf-head">
                  <div className="eyebrow">Pídenos tu cotización</div>
                  <h3 className="serif">Toma menos de un minuto.</h3>
                </div>

                <div className="qf-row">
                  <label className="qf-field">
                    <span className="qf-lbl">Nombre</span>
                    <input type="text" placeholder="¿Cómo te llamas?" autoComplete="name" />
                  </label>
                  <label className="qf-field">
                    <span className="qf-lbl">WhatsApp o teléfono</span>
                    <input type="tel" placeholder="+56 9 0000 0000" autoComplete="tel" />
                  </label>
                </div>

                <label className="qf-field">
                  <span className="qf-lbl">Email</span>
                  <input type="email" placeholder="tu@correo.cl" autoComplete="email" />
                </label>

                <div className="qf-field">
                  <span className="qf-lbl">Servicios que necesitas</span>
                  <div className="qf-chips">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s.k}
                        className={`qf-chip${services[s.k] ? ' on' : ''}`}
                        onClick={() => toggle(s.k)}
                      >
                        <span className="qf-chip-tick" aria-hidden="true">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4l2.5 2.5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="qf-chip-text">
                          <b>{s.t}</b>
                          <small>{s.sub}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="qf-field">
                  <span className="qf-lbl">Cantidad estimada de fotos</span>
                  <div className="qf-segm">
                    {COUNTS.map((v) => (
                      <button
                        type="button"
                        key={v}
                        className={count === v ? 'on' : ''}
                        onClick={() => setCount(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="qf-field">
                  <span className="qf-lbl">
                    Cuéntanos del proyecto <small>(opcional)</small>
                  </span>
                  <textarea
                    rows={3}
                    placeholder="Tipo de propiedad, ubicación, urgencia, links a referencias…"
                  />
                </label>

                <div className="qf-actions">
                  <button type="submit" className="btn btn-primary">
                    Enviar para cotizar <span className="btn-arrow" />
                  </button>
                  <a
                    href="https://wa.me/56900000000"
                    className="btn btn-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.4 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1s-1.2-.4-2.3-1.4c-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.4.1-.5.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2.1-.3 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3 4.8 4.2 1.7.7 2.3.8 3.1.7.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3zm-5.2 7.2h-.1a9.5 9.5 0 0 1-4.8-1.3l-.3-.2-3.5.9.9-3.4-.2-.4a9.5 9.5 0 1 1 17.5-5.1c0 5.2-4.3 9.5-9.5 9.5zm8.1-17.6A11.4 11.4 0 0 0 12.2 1C5.9 1 .8 6.1.8 12.4c0 2 .5 3.9 1.5 5.7L.5 24l6-1.6a11.3 11.3 0 0 0 5.5 1.4h.1c6.3 0 11.4-5.1 11.4-11.4a11.4 11.4 0 0 0-3.2-8z" />
                    </svg>
                    Prefiero WhatsApp
                  </a>
                </div>

                <p className="qf-fine">
                  Sin compromiso · No compartimos tus datos · Respondemos en horario hábil
                </p>
              </>
            ) : (
              <div className="qf-success">
                <div className="qf-check serif">✓</div>
                <h3 className="serif">Recibimos tu pedido.</h3>
                <p>
                  Te enviamos la cotización al correo y al WhatsApp en menos de tres horas
                  hábiles. Si necesitas algo urgente, escríbenos directo y lo resolvemos al tiro.
                </p>
                <a
                  href="https://wa.me/56900000000"
                  className="btn btn-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp <span className="btn-arrow" />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
