import CallToAction from "src/components/landing/CallToAction";
import FanFeatures from "src/components/landing/features/FanFeatures";
import FanHero from "src/components/landing/heros/FanHero";
import LandingLayout from "src/layouts/LandingLayout";

export default function Fans() {
  return (
    <LandingLayout>
      <FanHero />
      <FanFeatures />
      <CallToAction />
    </LandingLayout>
  )
}