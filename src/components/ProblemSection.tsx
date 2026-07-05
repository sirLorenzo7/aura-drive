import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { AlertTriangle } from "lucide-react";

const stats = [
  { value: "Millions", label: "Millions of road accidents worldwide are attributed to driver fatigue and microsleeps every year." },
  { value: "20%", label: "Up to 20% of all fatal highway accidents globally involve driver fatigue." },
  { value: "100 Meters", label: "A 3-second microsleep at highway speeds means the car travels over 100 meters completely uncontrolled." },
];

const videoEmbeds = [
  {
    id: "2jDllo6fdBg",
    title: "Drowsy driving awareness video 1",
  },
  {
    id: "4hCO_2vTGIo",
    title: "Drowsy driving awareness video 2",
  },
  {
    id: "OZxcV3oKhgQ",
    title: "Drowsy driving awareness video 3",
  },
];

const buildEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1&modestbranding=1&playlist=${id}`;

const ScrollVideo = ({ id, title }: { id: string; title: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const fullyVisible = entry.intersectionRatio >= 0.85;
          if (fullyVisible) {
            setMounted(true);
            setPlaying(true);
          } else {
            setPlaying(false);
          }
        });
      },
      { threshold: [0, 0.5, 0.85, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const command = playing ? "playVideo" : "pauseVideo";
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*"
    );
  }, [playing, mounted]);

  return (
    <div
      ref={wrapRef}
      className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_0_40px_-15px_hsl(var(--accent)/0.25)] transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_60px_-10px_hsl(var(--accent)/0.4)]"
    >
      <div className="relative aspect-[9/16] w-full">
        {mounted ? (
          <iframe
            ref={iframeRef}
            className="absolute inset-0 h-full w-full"
            src={buildEmbedUrl(id)}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-card">
            <div className="h-10 w-10 animate-pulse rounded-full bg-accent/30" />
          </div>
        )}
      </div>
    </div>
  );
};

const ProblemSection = () => (
  <section id="problem" className="section-padding bg-section-alt">
    <div className="mx-auto max-w-7xl px-6">
      <ScrollReveal>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
            The Problem
          </p>
        </div>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Driver fatigue is a silent killer.{" "}
          <span className="text-muted-foreground">It doesn't wait.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every year, thousands of lives are shattered by accidents caused by drowsy driving. Microsleeps — brief, uncontrollable lapses in attention — can strike without warning. By the time you feel tired, it is often already too late.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.value} delay={i * 0.15}>
            <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_30px_-10px_hsl(var(--accent)/0.2)]">
              <p className="text-4xl font-bold text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-20 flex flex-col items-center gap-16">
          {videoEmbeds.map((video, i) => (
            <ScrollReveal key={video.id} delay={i * 0.1}>
              <ScrollVideo id={video.id} title={video.title} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProblemSection;
