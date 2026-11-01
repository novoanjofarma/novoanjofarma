const paths: Record<string, string> = {
  pill: "M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7zM8.5 8.5l7 7",
  shield: "M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6zM9 12l2 2 4-4",
  bug: "M12 8a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4zM9 5l1.5 2M15 5l-1.5 2M4 12h4M16 12h4M5 18l3-2M19 18l-3-2",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
  bottle: "M9 3h6v3l1.5 2.5V20a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V8.5L9 6zM7.5 13h9",
  leaf: "M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l8-8",
  hospital: "M4 21V6l8-3 8 3v15zM12 8v6M9 11h6M10 21v-4h4v4",
  truck: "M2 7h11v9H2zM13 10h4l3 3v3h-7zM6 19a1.5 1.5 0 1 0 0-.01M17 19a1.5 1.5 0 1 0 0-.01",
  tag: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2 2 0 1 0 0-.01",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  chat: "M4 5h16v11H9l-5 4zM8 9h8M8 12h5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2M20 11a2 2 0 1 0 0-.01",
  store: "M4 9l1-5h14l1 5M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 6 0 2.5 2.5 0 0 0 5 0M5 11v9h14v-9M10 20v-5h4v5",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
};

export function Icon({ name, className = "h-6 w-6" }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name] ?? paths.pill} />
    </svg>
  );
}
