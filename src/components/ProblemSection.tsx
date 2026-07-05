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
    embedUrl: "https://www.youtube.com/embed/2jDllo6fdBg?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1&modestbranding=1&playlist=2jDllo6fdBg",
  },
  {
    id: "4hCO_2vTGIo",
    title: "Drowsy driving awareness video 2",
    embedUrl: "https://www.youtube.com/embed/4hCO_2vTGIo?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1&modestbranding=1&playlist=4hCO_2vTGIo",
  },
  {
    id: "OZxcV3oKhgQ",
    title: "Drowsy driving awareness video 3",
    embedUrl: "https://www.youtube.com/embed/OZxcV3oKhgQ?autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1&modestbranding=1&playlist=OZxcV3oKhgQ",
  },
];

const LazyVideo = ({ embedUrl, title }: { embedUrl: string; title: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "150px", threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_50px_-10px_hsl(var(--accent)/0.3)]"
    >
      <div className="relative aspect-video pointer-events-none">
        {visible ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card" />
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
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videoEmbeds.map((video, i) => (
            <ScrollReveal key={video.id} delay={i * 0.1}>
              <LazyVideo embedUrl={video.embedUrl} title={video.title} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProblemSection;
