export default function StudioMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Studio working identity mark"
      className={className}
    >
      <rect x="1" y="1" width="46" height="46" fill="none" stroke="currentColor" />
      <path d="M12 12H31L36 17H17L12 22H31L36 27H17L12 32H36" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M33 10V38" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="38" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}
