import CallToAction from "src/components/landing/CallToAction";
import ArtistFeatures from "src/components/landing/features/ArtistFeatures";
import ArtistHero from "src/components/landing/heros/ArtistHero";
import LandingLayout from "src/layouts/LandingLayout";

export default function Artists() {
  return(
    <LandingLayout>
      <ArtistHero />
      <ArtistFeatures />
      <CallToAction />
    </LandingLayout>
  )
}