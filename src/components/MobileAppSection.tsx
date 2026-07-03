import { motion } from "framer-motion";
import { Phone, MessageSquare, MapPin, Zap, Shield, Radio } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const notifications = [
  {
    icon: Phone,
    title: "Call Initiated",
    desc: "Emergency contact • Ringing...",
    color: "from-emerald-400 to-emerald-600",
    ring: "shadow-[0_0_30px_-4px_rgba(16,185,129,0.55)]",
    delay: 0.2,
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Sent",
    desc: "Live location shared 📍 12.9716° N, 77.5946° E",
    color: "from-[#25D366] to-[#128C7E]",
    ring: "shadow-[0_0_30px_-4px_rgba(37,211,102,0.55)]",
    delay: 0.55,
  },
  {
    icon: Radio,
    title: "SMS Delivered",
    desc: "Emergency alert + GPS coordinates",
    color: "from-cyan-400 to-sky-600",
    ring: "shadow-[0_0_30px_-4px_rgba(0,229,255,0.55)]",
    delay: 0.9,
  },
];

const features = [
  {
    icon: Phone,
    title: "Automated Emergency Calls",
    desc: "The instant a critical microsleep is detected, the Awakelens app auto-dials your saved emergency contacts — zero taps required.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp + SMS Alerts",
    desc: "Simultaneous WhatsApp and SMS bursts are dispatched to family, friends, and roadside services in the same second.",
  },
  {
    icon: MapPin,
    title: "Real-time GPS Location",
    desc: "Every emergency message embeds live GPS coordinates and a one-tap map link — rescuers reach the driver in minutes, not hours.",
  },
  {
    icon: Shield,
    title: "Zero Intervention Protocol",
    desc: "From ESP32 detection to app dispatch — the entire safety chain executes autonomously without a single user action.",
  },
];

const MobileAppSection = () => (
  <section id="app" className="section-padding relative overflow-hidden bg-section-alt">
    {/* Ambient background glow */}
    <div className="pointer-events-none absolute inset-0 -z-0">
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
    </div>

    <div className="relative mx-auto max-w-7xl px-6">
      <ScrollReveal>
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent mb-4">
          Companion Mobile App
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          When seconds matter,{" "}
          <span className="text-gradient-accent">your phone acts for you.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          The moment ESP32 detects a critical drowsiness event, the Awakelens app executes emergency protocols autonomously — calls, SMS, and WhatsApp alerts all include live GPS coordinates for immediate rescue.
        </p>
      </ScrollReveal>

      <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
        {/* Phone mockup */}
        <ScrollReveal>
          <div className="relative mx-auto flex items-center justify-center">
            {/* Glow behind phone */}
            <div className="absolute inset-0 -z-10 mx-auto h-[560px] w-[320px] rounded-[3rem] bg-accent/20 blur-3xl" />

            {/* Phone body */}
            <div className="relative h-[600px] w-[300px] rounded-[3rem] border border-border/60 bg-gradient-to-b from-[#0a0d10] to-[#050708] p-3 shadow-[0_25px_80px_-20px_rgba(0,229,255,0.35)]">
              {/* Side buttons */}
              <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-border" />
              <div className="absolute -left-[3px] top-40 h-12 w-[3px] rounded-l bg-border" />
              <div className="absolute -left-[3px] top-56 h-12 w-[3px] rounded-l bg-border" />
              <div className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-border" />

              {/* Screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-gradient-to-b from-[#040709] via-[#06090c] to-[#020304]">
                {/* Dynamic island / notch */}
                <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 text-[10px] text-foreground/80">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span>5G</span>
                    <span>•••</span>
                    <span>100%</span>
                  </span>
                </div>

                {/* App header */}
                <div className="mt-10 px-5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    Awakelens · Active
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2">
                    <Zap className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-[11px] font-semibold text-red-300">Microsleep Detected</p>
                      <p className="text-[9px] text-red-300/70">Executing emergency protocol…</p>
                    </div>
                  </div>
                </div>

                {/* Notifications stream */}
                <div className="mt-5 space-y-3 px-4">
                  {notifications.map((n) => (
                    <motion.div
                      key={n.title}
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55, delay: n.delay, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 backdrop-blur ${n.ring}`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${n.color}`}>
                        <n.icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">{n.title}</p>
                        <p className="mt-0.5 truncate text-[9.5px] text-muted-foreground">{n.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Live GPS badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 backdrop-blur"
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  <span className="text-[9px] font-medium uppercase tracking-widest text-accent">
                    Live GPS · Sharing
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Floating signal arcs */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[560px] w-[340px] rounded-[3rem] border border-accent/30"
            />
          </div>
        </ScrollReveal>

        {/* Features */}
        <div className="space-y-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="group flex gap-5 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-all duration-300 hover:border-accent/40 hover:bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.4}>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent p-5">
              <Radio className="h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">ESP32 ↔ App:</span>{" "}
                <span className="text-muted-foreground">
                  Sub-second BLE handshake between the glasses and your phone — a complete, zero-intervention safety ecosystem.
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

export default MobileAppSection;
