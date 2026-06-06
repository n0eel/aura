import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumière — A Love Letter from the Future" },
      {
        name: "description",
        content:
          "An interactive cinematic love letter — emotional, dreamy, and unforgettable. Built for two people, written in starlight.",
      },
      { property: "og:title", content: "Lumière — A Love Letter from the Future" },
      {
        property: "og:description",
        content: "A futuristic emotional universe made for two people.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
