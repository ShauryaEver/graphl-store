export function TshirtOutline({ view = "front" }) {
  if (view === "back") {
    return (
      <svg viewBox="0 0 400 480" className="w-full h-full" fill="none">
        <path
          d="M120 40 L150 20 Q200 5 250 20 L280 40 L340 80 L320 130 L290 110 L290 460 L110 460 L110 110 L80 130 L60 80 Z"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="white"
        />
        <path d="M150 20 Q200 45 250 20" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 480" className="w-full h-full" fill="none">
      <path
        d="M120 40 L150 20 Q165 50 200 50 Q235 50 250 20 L280 40 L340 80 L320 130 L290 110 L290 460 L110 460 L110 110 L80 130 L60 80 Z"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="white"
      />
      <path
        d="M150 20 Q165 50 200 50 Q235 50 250 20"
        stroke="#1a1a1a"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function HoodieOutline({ view = "front" }) {
  if (view === "back") {
    return (
      <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
        <path
          d="M110 60 Q200 0 290 60 L330 90 L350 140 L320 170 L300 150 L300 470 L100 470 L100 150 L80 170 L50 140 L70 90 Z"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="white"
        />
        <path
          d="M110 60 Q200 110 290 60"
          stroke="#1a1a1a"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
      <path
        d="M110 60 Q150 30 165 65 Q200 90 235 65 Q250 30 290 60 L330 90 L350 140 L320 170 L300 150 L300 470 L100 470 L100 150 L80 170 L50 140 L70 90 Z"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        fill="white"
      />
      <path
        d="M150 30 Q165 65 200 90 Q235 65 250 30"
        stroke="#1a1a1a"
        strokeWidth="2"
        fill="none"
      />
      <rect x="160" y="280" width="80" height="60" rx="8" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <line x1="200" y1="280" x2="200" y2="340" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
  );
}