import { COLORS } from '../constants'

interface Props {
  tag: string
  highlighted?: boolean
  small?: boolean
}

export default function TagBadge({ tag, highlighted = false, small = false }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: small ? '2px 8px' : '4px 10px',
        borderRadius: 20,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        background: highlighted ? COLORS.primary : COLORS.bg,
        color: highlighted ? '#fff' : COLORS.subtext,
        border: `1px solid ${highlighted ? COLORS.primary : COLORS.border}`,
        margin: '2px 3px 2px 0',
      }}
    >
      {tag}
    </span>
  )
}
