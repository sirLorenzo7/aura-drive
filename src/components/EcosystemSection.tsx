import ScrollReveal from "./ScrollReveal";
import { Smartphone, Wifi, Bell } from "lucide-react";

const connections = [
  { icon: Smartphone, label: "Mobile App", desc: "Real-time monitoring & trip history" },
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
          Awakelens doesn't work alone. It syncs with your phone to create a complete safety network.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
    </div>
  </section>
);

export default EcosystemSection;
