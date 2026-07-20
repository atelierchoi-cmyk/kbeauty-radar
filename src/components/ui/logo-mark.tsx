export function BrandMark({
  initial,
  color,
  size = 40,
}: {
  initial: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-md font-display font-semibold text-white"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </div>
  );
}

export function RadarLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="radar-sweep h-full w-full rounded-full border border-[var(--color-ink)]"
        style={{ background: "var(--color-ink)" }}
      />
      <span
        className="absolute rounded-full bg-[var(--color-lime)]"
        style={{ width: size * 0.22, height: size * 0.22 }}
      />
    </div>
  );
}
