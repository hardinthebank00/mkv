export function AccentWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center px-[0.12em] font-serif italic leading-relaxed text-foreground" style={{ fontWeight: 400 }}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 inset-y-[0.08em] -z-10 -skew-x-[11deg] rounded-[3px] bg-primary/35"
      />
      {children}
    </span>
  )
}
