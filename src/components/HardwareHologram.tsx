import { motion } from "framer-motion";

/**
 * Pure SVG holographic blueprint of the Awakelens hardware:
 * ESP32-S3 MCU + dual IR eye-tracking sensors with animated traces and data nodes.
 */
const HardwareHologram = () => {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-3xl blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--accent) / 0.25), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-3xl border border-accent/20 bg-card/40 backdrop-blur-sm"
        style={{
          boxShadow:
            "0 0 80px -20px hsl(var(--accent) / 0.35), inset 0 0 60px -30px hsl(var(--accent) / 0.25)",
        }}
      >
        {/* Grid overlay */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Main schematic */}
        <svg
          viewBox="0 0 800 450"
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Traces */}
          <g
            stroke="hsl(var(--accent))"
            strokeWidth="1.2"
            fill="none"
            filter="url(#glow)"
            opacity="0.75"
          >
            <path d="M 180 225 L 300 225 L 340 185 L 400 185" />
            <path d="M 180 225 L 300 225 L 340 265 L 400 265" />
            <path d="M 620 225 L 500 225 L 460 185 L 400 185" />
            <path d="M 620 225 L 500 225 L 460 265 L 400 265" />
            <path d="M 400 130 L 400 90 L 250 90 L 250 160" />
            <path d="M 400 320 L 400 360 L 550 360 L 550 290" />
          </g>

          {/* Animated data pulses along traces */}
          {[
            { d: "M 180 225 L 300 225 L 340 185 L 400 185", dur: 3 },
            { d: "M 620 225 L 500 225 L 460 265 L 400 265", dur: 3.4 },
            { d: "M 400 130 L 400 90 L 250 90 L 250 160", dur: 4 },
            { d: "M 400 320 L 400 360 L 550 360 L 550 290", dur: 3.7 },
          ].map((p, i) => (
            <g key={i}>
              <circle r="3.5" fill="hsl(var(--accent))" filter="url(#glow)">
                <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" path={p.d} />
              </circle>
            </g>
          ))}

          {/* Central MCU (ESP32) */}
          <g filter="url(#glow)">
            <rect
              x="340"
              y="165"
              width="120"
              height="120"
              rx="8"
              fill="hsl(var(--accent) / 0.06)"
              stroke="hsl(var(--accent))"
              strokeWidth="1.5"
            />
            {/* MCU pins */}
            {[...Array(6)].map((_, i) => (
              <g key={`pin-${i}`}>
                <line
                  x1={340}
                  y1={180 + i * 18}
                  x2={330}
                  y2={180 + i * 18}
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                />
                <line
                  x1={460}
                  y1={180 + i * 18}
                  x2={470}
                  y2={180 + i * 18}
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                />
                <line
                  x1={355 + i * 18}
                  y1={165}
                  x2={355 + i * 18}
                  y2={155}
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                />
                <line
                  x1={355 + i * 18}
                  y1={285}
                  x2={355 + i * 18}
                  y2={295}
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                />
              </g>
            ))}
            {/* Die */}
            <rect
              x="370"
              y="195"
              width="60"
              height="60"
              rx="3"
              fill="hsl(var(--accent) / 0.12)"
              stroke="hsl(var(--accent))"
              strokeWidth="0.8"
            />
            <text
              x="400"
              y="229"
              textAnchor="middle"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              letterSpacing="1.5"
            >
              ESP32
            </text>
            <text
              x="400"
              y="242"
              textAnchor="middle"
              fontSize="6"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              opacity="0.7"
              letterSpacing="1"
            >
              S3 · 240MHz
            </text>
          </g>

          {/* Left IR sensor */}
          <g filter="url(#glow)">
            <circle
              cx="180"
              cy="225"
              r="38"
              fill="hsl(var(--accent) / 0.05)"
              stroke="hsl(var(--accent))"
              strokeWidth="1.2"
            />
            <circle
              cx="180"
              cy="225"
              r="22"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle cx="180" cy="225" r="6" fill="hsl(var(--accent))">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x="180"
              y="285"
              textAnchor="middle"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              letterSpacing="2"
            >
              IR · L
            </text>
          </g>

          {/* Right IR sensor */}
          <g filter="url(#glow)">
            <circle
              cx="620"
              cy="225"
              r="38"
              fill="hsl(var(--accent) / 0.05)"
              stroke="hsl(var(--accent))"
              strokeWidth="1.2"
            />
            <circle
              cx="620"
              cy="225"
              r="22"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle cx="620" cy="225" r="6" fill="hsl(var(--accent))">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1.8s"
                begin="0.9s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x="620"
              y="285"
              textAnchor="middle"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              letterSpacing="2"
            >
              IR · R
            </text>
          </g>

          {/* Auxiliary nodes */}
          <g filter="url(#glow)">
            <circle
              cx="250"
              cy="160"
              r="10"
              fill="hsl(var(--accent) / 0.1)"
              stroke="hsl(var(--accent))"
              strokeWidth="1"
            />
            <text
              x="250"
              y="140"
              textAnchor="middle"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              opacity="0.8"
              letterSpacing="1"
            >
              BLE 5.0
            </text>

            <circle
              cx="550"
              cy="290"
              r="10"
              fill="hsl(var(--accent) / 0.1)"
              stroke="hsl(var(--accent))"
              strokeWidth="1"
            />
            <text
              x="550"
              y="315"
              textAnchor="middle"
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill="hsl(var(--accent))"
              opacity="0.8"
              letterSpacing="1"
            >
              CAN · OBD
            </text>
          </g>

          {/* Corner reticles */}
          {[
            [30, 30],
            [770, 30],
            [30, 420],
            [770, 420],
          ].map(([x, y], i) => (
            <g key={`ret-${i}`} stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.5">
              <line x1={x - 8} y1={y} x2={x + 8} y2={y} />
              <line x1={x} y1={y - 8} x2={x} y2={y + 8} />
            </g>
          ))}

          {/* Clinical labels */}
          <text
            x="30"
            y="60"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="hsl(var(--accent))"
            opacity="0.7"
            letterSpacing="2"
          >
            AWAKELENS · SCHEMATIC · v1.0
          </text>
          <text
            x="770"
            y="60"
            textAnchor="end"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="hsl(var(--accent))"
            opacity="0.7"
            letterSpacing="2"
          >
            REV · 06.2026
          </text>
          <text
            x="30"
            y="405"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="hsl(var(--accent))"
            opacity="0.5"
            letterSpacing="2"
          >
            ◉ REC · LIVE TELEMETRY
          </text>
        </svg>

        {/* Scanline sweep */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.08), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default HardwareHologram;
