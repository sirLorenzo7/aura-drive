import ScrollReveal from "./ScrollReveal";
import { AlertTriangle } from "lucide-react";

const stats = [
  { value: "100K+", label: "Drowsy driving crashes per year in the US" },
  { value: "1,550", label: "Fatalities annually from drowsy driving" },
  { value: "21%", label: "Of fatal crashes involve a drowsy driver" },
];

const videoPlaceholders = [
  {
    id: 1,
    title: "Video Link 1",
    url: "https://youtu.be/2jDllo6fdBg?si=2JhyCeZILyvvix0-",
  },
  {
    id: 2,
    title: "Video Link 2",
    url: "https://youtu.be/4hCO_2vTGIo?si=pUskHOp08eu_OLY4",
  },
  {
    id: 3,
    title: "Video Link 3",
    url: "https://youtu.be/OZxcV3oKhgQ?si=Gxcom-SxLYZZDYK6",
  },
];

const ProblemSection = () => (
  <section id="problem" className="section-padding bg-section-alt">
    <div className="mx-auto max-w-6xl px-6">
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
            <div className="rounded-2xl border border-border bg-card p-8">
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
        <div className="mt-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.15em] text-accent">
            See the dangers firsthand
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videoPlaceholders.map((video, i) => (
              <ScrollReveal key={video.id} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
                  <div className="relative aspect-video bg-secondary">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="mt-3 text-sm font-medium text-muted-foreground">
                        {video.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground truncate">
                      Replace with: {video.url}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProblemSection;
