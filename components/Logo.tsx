/**
 * Hive Creative logo, drawn as inline SVG so it stays razor sharp at any size and on
 * any display, with no image request and nothing to cache-bust when the brand changes.
 *
 * Geometry
 * --------
 * Fourteen pointy-top hexagons in a 2-3-4-3-2 rosette: 13 white, plus one brand-blue
 * accent in the lower-middle row. Positions are derived from the hex grid rather than
 * hand-placed, so the cluster stays perfectly symmetrical:
 *
 *   horizontal step = R x sqrt(3)      (R = circumradius of one hexagon)
 *   vertical step   = R x 1.5          (rows interlock rather than stack)
 *
 * Sizing
 * ------
 * Control the mark with `iconClassName` (a height, e.g. "h-12 w-auto") and the wordmark
 * with `textClassName` (a font size, e.g. "text-3xl"). They are separate because the
 * optical balance between the two changes with scale.
 */

const R = 10.2; // hexagon circumradius, in viewBox units
const GAP = 0.9; // shrink each hexagon so the cluster reads as cells, not a blob
const STEP_X = R * Math.sqrt(3);
const STEP_Y = R * 1.5;
const CENTER = 50;

/** Rows of the rosette, top to bottom. */
const ROWS = [2, 3, 4, 3, 2];

/** Which cell is the accent: 4th row down, middle position, i.e. bottom centre. */
const ACCENT = { row: 3, col: 1 };

function hexPoints(cx: number, cy: number, r: number) {
  // Pointy-top: vertices every 60 degrees starting at the top.
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

const CELLS = ROWS.flatMap((count, row) =>
  Array.from({ length: count }, (_, col) => ({
    row,
    col,
    x: CENTER + (col - (count - 1) / 2) * STEP_X,
    y: CENTER + (row - (ROWS.length - 1) / 2) * STEP_Y,
    accent: row === ACCENT.row && col === ACCENT.col,
  })),
);

type LogoProps = {
  /** Classes for the wrapper, e.g. spacing or alignment overrides. */
  className?: string;
  /** Size the mark here, e.g. "h-12 w-auto". */
  iconClassName?: string;
  /** Size the wordmark here, e.g. "text-3xl". */
  textClassName?: string;
  /** Drop the wordmark and render the circular mark alone (footer, favicon, avatar). */
  iconOnly?: boolean;
  /** Accessible name. Set to "" when a nearby link already names the brand. */
  title?: string;
};

export default function Logo({
  className = '',
  iconClassName = 'h-12 w-auto',
  textClassName = 'text-3xl',
  iconOnly = false,
  title = 'Hive Creative',
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={iconClassName}
        role={title ? 'img' : 'presentation'}
        aria-label={title || undefined}
        aria-hidden={title ? undefined : true}
        focusable="false"
      >
        {title && <title>{title}</title>}
        <circle cx={CENTER} cy={CENTER} r="46" fill="#FF8F00" />
        {CELLS.map((c) => (
          <polygon
            key={`${c.row}-${c.col}`}
            points={hexPoints(c.x, c.y, R * GAP)}
            fill={c.accent ? '#0F4993' : '#FFFFFF'}
          />
        ))}
      </svg>

      {!iconOnly && (
        <span
          className={`whitespace-nowrap lowercase leading-none tracking-tight text-brand-navy ${textClassName}`}
        >
          <span className="font-bold">hive</span> <span className="font-normal">creative</span>
        </span>
      )}
    </span>
  );
}
