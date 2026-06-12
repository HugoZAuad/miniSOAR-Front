interface SkeletonProps {
  height?: number | string
  width?: number | string
  borderRadius?: number
  style?: React.CSSProperties
}

export function Skeleton({ height = 16, width = '100%', borderRadius = 6, style }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius, ...style }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton height={12} width="60%" />
      <Skeleton height={32} width="40%" />
      <Skeleton height={10} width="80%" />
    </div>
  )
}

export function SkeletonTableRow() {
  return (
    <tr>
      {[100, 80, 60, 70, 50, 80].map((w, i) => (
        <td key={i}>
          <Skeleton height={14} width={`${w}%`} />
        </td>
      ))}
    </tr>
  )
}
