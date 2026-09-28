import Image from "next/image";
import JourneyExperience from "@/components/scenes/JourneyExperience";
import Navbar from "@/components/navigation/Navbar";
import LeadershipSection from "@/components/leadership/LeadershipSection";
import AboutSection from "@/components/about/AboutSection";
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection";
import LiveSermonsSection from "@/components/livestream/LiveSermonsSection";
import PrayerSection from "@/components/prayer/PrayerSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import MusicControl from "@/components/audio/MusicControl";
import SiteFooter from "@/components/footer/SiteFooter";

const welcomeSpirits = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  imageNumber: (index % 3) + 1,
}));

export default function Home() {
  return (
    <main>
      <JourneyExperience />

      <Navbar />

      <section id="welcome" className="welcome-section">
        <div className="welcome-section-background" aria-hidden="true" />
        <div className="welcome-section-overlay" aria-hidden="true" />

        <div className="welcome-spirit-layer" aria-hidden="true">
          {welcomeSpirits.map((spirit) => (
            <Image
              key={spirit.id}
              src={`/scenery/spirit-walker-${spirit.imageNumber}.png`}
              alt=""
              width={160}
              height={240}
              className={`welcome-spirit welcome-spirit-${spirit.id}`}
            />
          ))}
        </div>

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

      <LeadershipSection />
      <AboutSection />
      <UpcomingEventsSection />
      <LiveSermonsSection />
      <PrayerSection />
      <TestimonialSection />

      <SiteFooter />
      <MusicControl />
    </main>
  );
}
