import ScrollReveal from "./ScrollReveal";
import { AlertTriangle } from "lucide-react";

const stats = [
  { value: "100K+", label: "Drowsy driving crashes per year in the US" },
  { value: "1,550", label: "Fatalities annually from drowsy driving" },
  { value: "21%", label: "Of fatal crashes involve a drowsy driver" },
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
          Drowsy driving kills.{" "}
          <span className="text-muted-foreground">Every single day.</span>
        </h2>
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
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex aspect-video items-center justify-center bg-secondary">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Video / Background Placeholder
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Embed an explanatory video about drowsy driving dangers
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ProblemSection;
