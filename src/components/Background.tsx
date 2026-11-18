const repeat = (word: string, times: number) =>
  Array.from({ length: times }, () => word).join("  ★  ") + "  ★  ";

type Shape = {
  type: "circle" | "square" | "ring" | "tri" | "star";
  size: number;
  color: string;
  top: string;
  left: string;
  anim: string;
  dur: string;
  delay: string;
  opacity: number;
};

const SHAPES: Shape[] = [
  { type: "circle", size: 88, color: "#FFD227", top: "12%", left: "6%", anim: "float-slow", dur: "13s", delay: "0s", opacity: 0.5 },
  { type: "ring", size: 120, color: "#FF2D78", top: "22%", left: "82%", anim: "float-mid", dur: "10s", delay: "-2s", opacity: 0.55 },
  { type: "square", size: 62, color: "#1F7BF6", top: "62%", left: "10%", anim: "float-mid", dur: "11s", delay: "-4s", opacity: 0.45 },
  { type: "tri", size: 96, color: "#FF7A18", top: "72%", left: "86%", anim: "float-slow", dur: "15s", delay: "-1s", opacity: 0.5 },
  { type: "star", size: 70, color: "#FFF6EC", top: "42%", left: "91%", anim: "float-slow", dur: "12s", delay: "-6s", opacity: 0.45 },
  { type: "circle", size: 46, color: "#FF2D78", top: "84%", left: "32%", anim: "float-mid", dur: "9s", delay: "-3s", opacity: 0.5 },
  { type: "ring", size: 72, color: "#FFD227", top: "6%", left: "46%", anim: "float-slow", dur: "14s", delay: "-5s", opacity: 0.4 },
  { type: "square", size: 40, color: "#FF7A18", top: "34%", left: "24%", anim: "float-mid", dur: "12s", delay: "-7s", opacity: 0.4 },
  { type: "tri", size: 58, color: "#FFD227", top: "52%", left: "52%", anim: "float-slow", dur: "16s", delay: "-9s", opacity: 0.35 },
  { type: "star", size: 52, color: "#FF2D78", top: "90%", left: "66%", anim: "float-mid", dur: "10s", delay: "-2s", opacity: 0.45 },
];

function ShapeArt({ shape }: { shape: Shape }) {
  const common = {
    width: shape.size,
    height: shape.size,
  };
  if (shape.type === "circle")
    return (
      <div
        style={{
          ...common,
          background: shape.color,
          borderRadius: "9999px",
          boxShadow: `0 0 60px ${shape.color}80`,
        }}
      />
    );
  if (shape.type === "ring")
    return (
      <div
        style={{
          ...common,
          border: `${Math.max(6, shape.size / 12)}px solid ${shape.color}`,
          borderRadius: "9999px",
        }}
      />
    );
  if (shape.type === "square")
    return (
      <div
        style={{
          ...common,
          background: shape.color,
          borderRadius: shape.size / 6,
          transform: "rotate(18deg)",
        }}
      />
    );
  if (shape.type === "tri")
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
          filter: `drop-shadow(0 0 30px ${shape.color}70)`,
        }}
      />
    );
  return (
    <svg viewBox="0 0 100 100" style={common}>
      <path
        d="M50 2 61 36 96 36 68 57 79 92 50 71 21 92 32 57 4 36 39 36Z"
        fill={shape.color}
      />
    </svg>
  );
}

export default function Background() {
  return (
    <div aria-hidden className="grain fixed inset-0 z-0 overflow-hidden">
      {/* base animated gradient */}
      <div className="aurora absolute inset-0" />

      {/* readability scrim: keeps the colours alive but the type legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, rgba(23,4,52,0.68) 0%, rgba(23,4,52,0.38) 42%, rgba(23,4,52,0.42) 62%, rgba(23,4,52,0.72) 100%)",
        }}
      />

      {/* glows */}
      <div
        className="absolute -left-[18vmin] -top-[14vmin] h-[62vmin] w-[62vmin] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,45,120,0.55), rgba(255,45,120,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-[16vmin] -right-[12vmin] h-[70vmin] w-[70vmin] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,24,0.45), rgba(255,122,24,0) 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(123,31,209,0.5), rgba(38,6,79,0) 70%)",
        }}
      />

      {/* rotating MAIS POR MENOS rings */}
      <svg
        viewBox="0 0 800 800"
        className="absolute left-1/2 top-1/2 h-[132vmin] w-[132vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <defs>
          <path id="mpm-ring-1" d="M400,400 m-330,0 a330,330 0 1,1 660,0 a330,330 0 1,1 -660,0" fill="none" />
          <path id="mpm-ring-2" d="M400,400 m-255,0 a255,255 0 1,1 510,0 a255,255 0 1,1 -510,0" fill="none" />
          <path id="mpm-ring-3" d="M400,400 m-182,0 a182,182 0 1,1 364,0 a182,182 0 1,1 -364,0" fill="none" />
          <path id="mpm-ring-4" d="M400,400 m-110,0 a110,110 0 1,1 220,0 a110,110 0 1,1 -220,0" fill="none" />
        </defs>

        <g className="ring-spin-slow">
          <text
            fill="#FFF6EC"
            fillOpacity="0.22"
            style={{ fontFamily: "Anton, sans-serif", fontSize: 52, letterSpacing: "0.06em" }}
          >
            <textPath href="#mpm-ring-1">{repeat("MAIS POR MENOS", 7)}</textPath>
          </text>
        </g>

        <g className="ring-spin-rev">
          <text
            fill="#FFD227"
            fillOpacity="0.26"
            style={{ fontFamily: "Anton, sans-serif", fontSize: 40, letterSpacing: "0.12em" }}
          >
            <textPath href="#mpm-ring-2">{repeat("MAIS POR MENOS", 6)}</textPath>
          </text>
        </g>

        <g className="ring-spin">
          <text
            fill="#FFF6EC"
            fillOpacity="0.2"
            style={{ fontFamily: "Anton, sans-serif", fontSize: 34, letterSpacing: "0.1em" }}
          >
            <textPath href="#mpm-ring-3">{repeat("MAIS POR MENOS", 5)}</textPath>
          </text>
        </g>

        <g className="ring-spin-rev">
          <text
            fill="#FF2D78"
            fillOpacity="0.3"
            style={{ fontFamily: "Anton, sans-serif", fontSize: 28, letterSpacing: "0.16em" }}
          >
            <textPath href="#mpm-ring-4">{repeat("R$", 6)}</textPath>
          </text>
        </g>
      </svg>

      {/* floating geometry */}
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.anim}`}
          style={{
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        >
          <ShapeArt shape={s} />
        </div>
      ))}
    </div>
  );
}
