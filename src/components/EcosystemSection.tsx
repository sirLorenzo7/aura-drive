import ScrollReveal from "./ScrollReveal";
import { Smartphone, Watch, Wifi, Bell } from "lucide-react";

const connections = [
  { icon: Smartphone, label: "Mobile App", desc: "Real-time monitoring & trip history" },
  { icon: Watch, label: "Smartwatch", desc: "Wrist vibrations for silent alerts" },
  { icon: Wifi, label: "BLE / Wi-Fi", desc: "Seamless wireless connectivity" },
  { icon: Bell, label: "Push Alerts", desc: "Instant notifications to contacts" },
];

const EcosystemSection = () => (
  <section id="ecosystem" className="section-padding bg-section-alt">
    <div className="mx-auto max-w-6xl px-6">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent mb-4">
          The Ecosystem
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Connected safety.{" "}
          <span className="text-muted-foreground">Everywhere.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          DrowseGuard doesn't work alone. It syncs with your phone and watch to create a complete safety network.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {connections.map((c, i) => (
          <ScrollReveal key={c.label} delay={i * 0.1}>
            <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-accent/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                <c.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{c.label}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{c.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex aspect-video items-center justify-center bg-secondary">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Ecosystem Demo Placeholder
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Embed a video showing alerts on phone & smartwatch
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default EcosystemSection;
