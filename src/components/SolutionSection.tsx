import ScrollReveal from "./ScrollReveal";
import { Eye, Zap, Car } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import demoVideo from "@/assets/awakelens-demo.mp4.asset.json";

const steps = [
  {
    step: "01",
    icon: Eye,
    title: "Detect Drowsiness",
    description:
      "Smart glasses use advanced infrared sensors and eye-tracking algorithms to continuously monitor blink rate and eye closure patterns in real time.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Trigger Local Alert",
    description:
      "The moment fatigue or microsleep is detected, the system fires an immediate multi-sensory alert — haptic vibrations, audio tones, and visual warnings.",
  },
  {
    step: "03",
    icon: Car,
    title: "Autonomous Safety Command",
    description:
      "If the driver remains unresponsive, Awakelens communicates directly with the vehicle's control unit, issuing a command to safely pull over and park autonomously — preventing an accident before it happens.",
  },
];

const SolutionSection = () => (
  <section id="solution" className="section-padding">
    <div className="mx-auto max-w-6xl px-6">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent mb-4">
          How It Works
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Three steps to total safety.{" "}
          <span className="text-muted-foreground">Zero compromise.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Awakelens doesn't just detect danger — it eliminates it. From the first sign of fatigue to an autonomous emergency stop, your safety is never left to chance.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.12}>
            <div className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <span className="absolute right-6 top-6 text-5xl font-bold text-accent/10 transition-colors group-hover:text-accent/20">
                {s.step}
              </span>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <s.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <DemoVideo />
      </ScrollReveal>
    </div>
  </section>
);

export default SolutionSection;
