import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { AlertTriangle } from "lucide-react";

const stats = [
  { value: "Millions", label: "Millions of road accidents worldwide are attributed to driver fatigue and microsleeps every year." },
  { value: "20%", label: "Up to 20% of all fatal highway accidents globally involve driver fatigue." },
  { value: "100 Meters", label: "A 3-second microsleep at highway speeds means the car travels over 100 meters completely uncontrolled." },
];

const videoEmbeds = [
  { id: "2jDllo6fdBg", title: "Drowsy driving awareness video 1" },
  { id: "4hCO_2vTGIo", title: "Drowsy driving awareness video 2" },
  { id: "OZxcV3oKhgQ", title: "Drowsy driving awareness video 3" },
];

const buildEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&loop=1&controls=0&rel=0&playsinline=1&modestbranding=1&playlist=${id}`;

const AccordionVideo = ({
  id,
  title,
  active,
  onActivate,
}: {
  id: string;
  title: string;
  active: boolean;
  onActivate: () => void;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active && !mounted) setMounted(true);
  }, [active, mounted]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow || !mounted) return;
    const command = active ? "playVideo" : "pauseVideo";
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*"
    );
  }, [active, mounted]);

  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={`group relative h-[560px] cursor-pointer overflow-hidden rounded-3xl border transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        active
          ? "flex-[6] border-accent/50 shadow-[0_0_60px_-10px_hsl(var(--accent)/0.5)]"
          : "flex-[1] border-border shadow-[0_0_30px_-15px_hsl(var(--accent)/0.2)]"
      }`}
    >
      {mounted ? (
        <iframe
          ref={iframeRef}
          className="absolute left-1/2 top-1/2 h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2"
          style={{ aspectRatio: "9 / 16" }}
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

      {/* Dim overlay for inactive */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          active ? "opacity-0" : "opacity-100 bg-background/70 backdrop-brightness-50"
        }`}
      />
    </div>
  );
};

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
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

        <div className="mt-20 flex w-full gap-4 overflow-hidden">
          {videoEmbeds.map((video, i) => (
            <AccordionVideo
              key={video.id}
              id={video.id}
              title={video.title}
              active={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
