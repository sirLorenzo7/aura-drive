import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Cpu, Eye, Zap, Battery, Gauge, Radio, Car } from "lucide-react";

const specs = [
  { icon: Cpu, label: "ESP32-S3", detail: "Dual-core 240MHz", color: "text-accent" },
  { icon: Eye, label: "IR Sensor", detail: "940nm wavelength", color: "text-accent" },
  { icon: Zap, label: "Latency", detail: "< 50ms response", color: "text-accent" },
  { icon: Battery, label: "Battery", detail: "12h continuous use", color: "text-accent" },
  { icon: Gauge, label: "Power Draw", detail: "< 80mA average", color: "text-accent" },
  { icon: Radio, label: "Connectivity", detail: "BLE 5.0 + Wi-Fi", color: "text-accent" },
  { icon: Car, label: "Vehicle Link", detail: "CAN bus / OBD-II command", color: "text-accent" },
  { icon: Zap, label: "Autonomy", detail: "Direct parking command", color: "text-accent" },
];

const TechSpecsSection = () => (
  <section id="specs" className="section-padding">
    <div className="mx-auto max-w-6xl px-6">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent mb-4">
          Tech Specs
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Engineered for{" "}
          <span className="text-muted-foreground">precision.</span>
        </h2>
      </ScrollReveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec, i) => (
          <ScrollReveal key={`${spec.label}-${i}`} delay={i * 0.08}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-accent/30"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
              <spec.icon className={`relative h-8 w-8 ${spec.color} mb-5`} />
              <h3 className="relative text-2xl font-bold text-foreground">{spec.label}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{spec.detail}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechSpecsSection;
