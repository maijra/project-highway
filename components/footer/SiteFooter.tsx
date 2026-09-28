"use client";

import Image from "next/image";

const FACEBOOK_PAGE =
  "https://www.facebook.com/isaiah358Ministries/";

const MAP_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=6639%20Ridge%20Ave%2C%20Douglasville%2C%20GA%2030135";

const CASH_APP_URL =
  "https://cash.app/$isaiah3582010";

const GIVELIFY_URL =
  "https://giv.li/uu513t";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const stars = Array.from({ length: 58 }, (_, index) => index);
  const meteors = Array.from({ length: 3 }, (_, index) => index);

  return (
    <footer className="site-footer">
      <div className="site-footer-galaxy" aria-hidden="true">
        <div className="site-footer-starfield">
          {stars.map((star) => (
            <span
              key={star}
              className={`site-footer-star site-footer-star-${(star % 14) + 1}`}
            />
          ))}
        </div>
        <div className="site-footer-meteors">
          {meteors.map((meteor) => (
            <span
              key={meteor}
              className={`site-footer-meteor site-footer-meteor-${meteor + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="site-footer-inner">
        <div className="site-footer-logo-row">
          <div className="site-footer-logo-card">
            <Image
              src="/logos/mainlogo.PNG"
              alt="Isaiah 35:8 Ministries"
              width={360}
              height={220}
              className="site-footer-church-logo"
            />
          </div>

          <div className="site-footer-logo-divider" aria-hidden="true" />

          <div className="site-footer-logo-card">
            <span className="site-footer-credit-label">Website design by</span>
            <Image
              src="/logos/Maijra-Consulting-Logo.png"
              alt="Maijra Consulting"
              width={360}
              height={220}
              className="site-footer-business-logo"
            />
          </div>
        </div>

        <div className="site-footer-ministry">
          <p className="site-footer-scripture">
            “And a highway shall be there, and a way, and it shall be called
            The way of holiness.”
          </p>
          <p className="site-footer-reference">Isaiah 35:8</p>
        </div>

        <div className="site-footer-extra-cards" aria-label="Connect with the ministry">
          <a
            className="site-footer-extra-card"
            href={FACEBOOK_PAGE}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="site-footer-extra-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                <path d="M13.7 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21h3.4Z" />
              </svg>
            </span>
            <span className="site-footer-extra-label">Follow Us</span>
            <strong>Facebook</strong>
            <span className="site-footer-extra-action">Visit our page →</span>
          </a>

          <a
            className="site-footer-extra-card"
            href={MAP_DIRECTIONS}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="site-footer-extra-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
            </span>
            <span className="site-footer-extra-label">Visit Us</span>
            <strong>Our Location</strong>
            <span className="site-footer-extra-detail">
              6639 Ridge Ave<br />Douglasville, GA 30135
            </span>
            <span className="site-footer-extra-action">Get directions →</span>
          </a>

          <a
            className="site-footer-extra-card"
            href={CASH_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Give with Cash App to $isaiah3582010"
          >
            <span className="site-footer-extra-qr">
              <Image
                src="/logos/cash-app-qr.png"
                alt="Scan to give to Isaiah 35:8 Ministries on Cash App"
                width={900}
                height={1024}
              />
            </span>
            <span className="site-footer-extra-label">Support the Ministry</span>
            <strong>Cash App</strong>
            <span className="site-footer-extra-detail">$isaiah3582010</span>
            <span className="site-footer-extra-action">Scan or tap to give →</span>
          </a>

          <a
            className="site-footer-extra-card"
            href={GIVELIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="site-footer-extra-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d="M20.8 8.2c0 4.1-5.2 8.3-8.8 11.1-3.6-2.8-8.8-7-8.8-11.1a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />
              </svg>
            </span>
            <span className="site-footer-extra-label">Give Online</span>
            <strong>Givelify</strong>
            <span className="site-footer-extra-detail">
              Support Isaiah 35:8 Ministries
            </span>
            <span className="site-footer-extra-action">Give with Givelify →</span>
          </a>
        </div>

        <div className="site-footer-rule" />
        <p className="site-footer-copyright">
          © {year} Isaiah 35:8 Ministries. All Rights Reserved.
        </p>
      </div>

      <style jsx>{`
        .site-footer-extra-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin: 42px 0 44px;
        }

        .site-footer-extra-card {
          display: flex;
          min-width: 0;
          min-height: 250px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 25px 18px;
          border: 1px solid rgba(232, 207, 118, 0.38);
          border-radius: 22px;
          color: #fff9e9;
          background: linear-gradient(150deg, rgba(64, 35, 36, 0.83), rgba(15, 10, 20, 0.94));
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
          text-align: center;
          text-decoration: none;
          transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }

        .site-footer-extra-card:hover {
          transform: translateY(-5px);
          border-color: #e8cf76;
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.3);
        }

        .site-footer-extra-card:focus-visible {
          outline: 3px solid #e8cf76;
          outline-offset: 4px;
        }

        .site-footer-extra-icon {
          display: grid;
          width: 58px;
          height: 58px;
          margin-bottom: 18px;
          place-items: center;
          border: 1px solid rgba(232, 207, 118, 0.6);
          border-radius: 50%;
          color: #e8cf76;
          background: rgba(232, 207, 118, 0.08);
        }

        .site-footer-extra-icon svg {
          width: 29px;
          height: 29px;
        }

        .site-footer-extra-qr {
          display: grid;
          width: 104px;
          height: 104px;
          margin-bottom: 13px;
          place-items: center;
          overflow: hidden;
          border: 5px solid #fff;
          border-radius: 10px;
          background: #fff;
        }

        .site-footer-extra-qr :global(img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .site-footer-extra-label {
          margin-bottom: 6px;
          color: #e8cf76;
          font-size: 0.72rem;
          font-weight: 750;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .site-footer-extra-card strong {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          font-weight: 500;
        }

        .site-footer-extra-detail {
          margin-top: 10px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .site-footer-extra-action {
          margin-top: 16px;
          color: #e8cf76;
          font-size: 0.83rem;
          font-weight: 650;
        }

        @media (max-width: 1020px) {
          .site-footer-extra-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .site-footer-extra-cards {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .site-footer-extra-card {
            min-height: 210px;
          }
        }
      `}</style>
    </footer>
  );
}
