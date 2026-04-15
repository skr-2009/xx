import { useProfile } from '../hooks/useProfile'
import { EVENTS, COLORS } from '../constants'
import TagBadge from '../components/TagBadge'

export default function EventsScreen() {
  const { profile } = useProfile()
  if (!profile) return null

  const getMatchingTags = (eventTags: string[]) =>
    eventTags.filter((t) => profile.tags.includes(t))

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '20px 20px 24px',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🗓️ イベント</h1>
        <p style={{ fontSize: 12, opacity: 0.8 }}>神山町で起きていること</p>
      </div>

      {/* Match note */}
      <div style={{ background: COLORS.primaryLight, padding: '10px 16px' }}>
        <p style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>
          ★ あなたの興味タグと一致するイベントをハイライトしています
        </p>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {EVENTS.map((event) => {
          const matchTags = getMatchingTags(event.tags)
          const hasMatch = matchTags.length > 0
          return (
            <div
              key={event.id}
              style={{
                background: COLORS.card,
                borderRadius: 16,
                padding: '16px',
                marginBottom: 12,
                border: hasMatch ? `1.5px solid ${COLORS.primary}` : `1.5px solid ${COLORS.border}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {/* Match badge */}
              {hasMatch && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: COLORS.primaryLight,
                  color: COLORS.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  marginBottom: 10,
                }}>
                  ★ あなたの興味と一致
                </div>
              )}

              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{event.emoji}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                    {event.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: COLORS.subtext }}>📅 {event.date}</span>
                    <span style={{ fontSize: 12, color: COLORS.subtext }}>⏰ {event.time}</span>
                    <span style={{ fontSize: 12, color: COLORS.subtext }}>📍 {event.location}</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: COLORS.subtext, lineHeight: 1.6, marginBottom: 10 }}>
                {event.description}
              </p>

              {/* Tags */}
              <div>
                {event.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} highlighted={profile.tags.includes(tag)} small />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: COLORS.subtext, padding: '4px 20px 8px' }}>
        イベント情報は定期的に更新されます
      </p>
    </div>
  )
}
