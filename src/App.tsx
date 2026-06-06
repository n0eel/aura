import { CustomCursor } from "@/components/CustomCursor";
import { StarField } from "@/components/StarField";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LoveCounter } from "@/components/LoveCounter";
import { SecretMessages } from "@/components/SecretMessages";
import { Forever } from "@/components/Forever";
import { HeartTrail } from "@/components/HeartTrail";
import { Constellation } from "@/components/Constellation";
import { LoveLetter } from "@/components/LoveLetter";
import { WishUpon } from "@/components/WishUpon";

export default function App() {
  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <HeartTrail />
      <StarField />

      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Gallery />
        <Constellation />
        <MusicPlayer />
        <LoveCounter />
        <SecretMessages />
        <LoveLetter />
        <WishUpon />
        <Forever />
      </main>
    </div>
  );
}
