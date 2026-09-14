export default function ProjectDiagram({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  const alternate = index % 2 === 1;

  return (
    <svg
      viewBox="0 0 800 520"
      role="img"
      aria-label={title}
      className="project-diagram-svg"
    >
      <rect x="1" y="1" width="798" height="518" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {alternate ? (
        <>
          <path d="M85 420L255 145L420 420Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M285 420L455 95L690 420Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M85 420H705" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <path d="M235 180H475" stroke="currentColor" strokeWidth="1" strokeDasharray="7 9" opacity="0.5" />
          <circle cx="455" cy="95" r="7" fill="currentColor" />
        </>
      ) : (
        <>
          <rect x="95" y="95" width="610" height="330" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="270" y="165" width="250" height="190" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M95 250H270M520 250H705M395 95V165M395 355V425" stroke="currentColor" strokeWidth="1.5" />
          <path d="M140 130L230 220M660 130L570 220M140 390L230 300M660 390L570 300" stroke="currentColor" strokeWidth="1" strokeDasharray="7 9" opacity="0.55" />
          <circle cx="395" cy="260" r="9" fill="currentColor" />
        </>
      )}

      <text x="28" y="45" fontSize="15" fill="currentColor" opacity="0.55">
        STUDY {String(index + 1).padStart(2, "0")}
      </text>
      <text x="772" y="490" fontSize="13" textAnchor="end" fill="currentColor" opacity="0.45">
        NOT TO SCALE
      </text>
    </svg>
  );
}
