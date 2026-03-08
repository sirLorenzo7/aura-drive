import ScrollReveal from "./ScrollReveal";
import { Eye, Cpu, Zap } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "IR Eye Tracking",
    description: "An infrared sensor monitors your blink rate and eye closure in real-time with medical-grade precision.",
  },
  {
    icon: Cpu,
    title: "ESP32 Processing",
    description: "Onboard ESP32 microcontroller processes sensor data instantly — no cloud dependency, no latency.",
  },
  {
    icon: Zap,
    title: "Instant Alert",
    description: "When drowsiness is detected, the system triggers haptic, audio, and visual alerts within milliseconds.",
  },
];

const SolutionSection = () => (
  <section id="solution" className="section-padding">
    <div className="mx-auto max-w-6xl px-6">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent mb-4">
          The Solution
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Intelligence on your face.{" "}
          <span className="text-muted-foreground">Literally.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          DrowseGuard embeds cutting-edge hardware into a lightweight frame — detecting the earliest signs of drowsiness before you even notice.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 0.12}>
            <div className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex aspect-video items-center justify-center bg-secondary">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Practical Demo Placeholder
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Embed a video showing IR sensor & ESP32 detecting eye closure
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default SolutionSection;
