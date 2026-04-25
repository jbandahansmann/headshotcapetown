export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }} aria-label="5 stars">
      {[0,1,2,3,4].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.6 7.3H22l-6.2 4.5 2.4 7.2L12 16.6 5.8 21l2.4-7.2L2 9.3h7.4z" />
        </svg>
      ))}
    </span>
  );
}
