export default function WelcomeSection() {
  return (
    <section id="welcome" className="welcome-section">
      <div className="welcome-content">
        <p className="welcome-eyebrow">Welcome To</p>

        <h1 className="welcome-title">Isaiah 35:8 Ministries</h1>

        <p className="welcome-scripture">
          “And a highway shall be there, and a way, and it shall be called The
          way of holiness.”
        </p>

        <p className="welcome-reference">Isaiah 35:8</p>

        <p className="welcome-message">
          A ministry built on faith, worship, fellowship, and the journey of
          walking in purpose. Whether joining us in person or online, there is
          a place here to grow, worship, and continue forward in faith.
        </p>

        <div className="welcome-actions">
          <a href="#live" className="welcome-button welcome-button-primary">
            Watch Live
          </a>

          <a
            href="#events"
            className="welcome-button welcome-button-secondary"
          >
            Upcoming Events
          </a>
        </div>

        <a className="welcome-scroll" href="#leadership">
          <span>Continue Exploring</span>
          <span className="welcome-arrow" aria-hidden="true">
            ⌄
          </span>
        </a>
      </div>
    </section>
  );
}
