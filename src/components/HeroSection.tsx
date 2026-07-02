import { motion } from "framer-motion";
import HardwareModel from "./HardwareModel";

const HeroSection = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Introducing Awakelens
      </p>
      <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.08] tracking-tight text-foreground md:text-7xl lg:text-8xl">
        Smart Glasses that Detect Drowsiness{" "}
        <span className="text-gradient-accent">and Safely Park Your Car</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
        When fatigue hits, Awakelens doesn't just warn you — it takes control. Autonomous safety for every journey.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mt-12 w-full max-w-4xl"
    >
      <div className="glow-accent relative mx-auto h-[420px] w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary/60 to-card md:h-[520px]">
        <HardwareModel />
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-card/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            Drag to rotate
          </span>
        </div>
      </div>
    </motion.div>


    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
    >
      <span className="text-xs">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="h-6 w-4 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center pt-1"
      >
        <div className="h-1.5 w-1 rounded-full bg-muted-foreground/60" />
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSection;
