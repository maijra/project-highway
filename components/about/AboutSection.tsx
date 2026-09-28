"use client";

const coreValues = [
  {
    number: "01",
    title: "We Are Invitational",
    keyword: "Bring",
    commitment:
      "We bring our neighbors, friends, and broken hearts to the feet of Jesus.",
    scripture:
      "And the Lord said unto the servant, Go out into the highways and hedges, and compel them to come in, that my house may be filled.",
    reference: "Luke 14:23 (KJV)",
  },
  {
    number: "02",
    title: "We Are A Family",
    keyword: "Accept",
    commitment:
      "We accept differences, forgive quickly, and extend grace to everyone who walks through our doors.",
    scripture:
      "Wherefore receive ye one another, as Christ also received us to the glory of God.",
    reference: "Romans 15:7 (KJV)",
  },
  {
    number: "03",
    title: "We Are Generous",
    keyword: "Give",
    commitment:
      "We give our first and our best to God, trusting him with our lives and resources.",
    scripture:
      "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.",
    reference: "2 Corinthians 9:7 (KJV)",
  },
  {
    number: "04",
    title: "We Are Servants",
    keyword: "Serve",
    commitment:
      "We serve without expecting anything in return, loving our community through tangible action.",
    scripture:
      "For, brethren, ye have been called unto liberty; only use not liberty for an occasion to the flesh, but by love serve one another.",
    reference: "Galatians 5:13 (KJV)",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-background" />
      <div className="about-glow about-glow-one" aria-hidden="true" />
      <div className="about-glow about-glow-two" aria-hidden="true" />
      <div className="about-overlay" />

      <div className="about-inner">
        <header className="about-heading">
          <p className="about-eyebrow">Who We Are</p>
          <h2 className="about-title">Built On Purpose</h2>
          <p className="about-intro">
            Our mission, vision, and core values guide how
            Isaiah 35:8 Ministries welcomes, serves, gives,
            and walks in faith together.
          </p>

          <div className="about-heading-line" aria-hidden="true">
            <span />
          </div>
        </header>

        <div className="about-purpose-grid">
          <article className="about-purpose-card">
            <p className="about-card-label">Our Mission</p>
            <h3>Bring. Accept. Give. Serve.</h3>
            <p className="about-purpose-quote">
              “Our mission is to bring all people to Christ,
              accept all with grace, give all we have to God,
              and serve all in love.”
            </p>
          </article>

          <article className="about-purpose-card">
            <p className="about-card-label">Our Vision</p>
            <h3>A Christ-Centered Community</h3>
            <p className="about-purpose-quote">
              “To be a Christ-centered community where every
              person is welcomed home, transformed by grace,
              and empowered to serve.”
            </p>
          </article>
        </div>

        <div className="about-values-heading">
          <p className="about-card-label">Our Core Values</p>
          <h3>Our Identity &amp; Culture</h3>
        </div>

        <div className="about-values-grid">
          {coreValues.map((value) => (
            <article key={value.number} className="about-value-card">
              <span className="about-value-number" aria-hidden="true">
                {value.number}
              </span>

              <div className="about-value-topline">
                <span className="about-value-keyword">
                  {value.keyword}
                </span>
              </div>

              <h4>{value.title}</h4>

              <p className="about-value-commitment">
                <strong>Our Commitment:</strong>{" "}
                {value.commitment}
              </p>

              <div className="about-value-scripture">
                <span className="about-scripture-mark" aria-hidden="true">
                  “
                </span>

                <p>{value.scripture}</p>
                <span>{value.reference}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
