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

export default function Home() {
  return (
    <main>
      <JourneyExperience />

      <Navbar />

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
