import { useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { useCheckins } from '../hooks/useCheckins'
import { usePoints } from '../hooks/usePoints'
import { SPOTS, DUMMY_USERS, COLORS } from '../constants'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { getTotalActiveForSpot, getActiveCheckins } = useCheckins()
  const { points } = usePoints()

  if (!profile) return null

  const getMatchCount = (spotId: string) => {
    const active = getActiveCheckins(spotId)
    return active.filter((c) => {
      const user = DUMMY_USERS.find((u) => u.id === c.userId)
      if (!user) return false
      return user.tags.some((t) => profile.tags.includes(t))
    }).length
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '20px 20px 24px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>🌿 KAMI EN</h1>
          <p style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>神山町のスポットを見つけよう</p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 10,
          padding: '6px 12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>{points}</div>
          <div style={{ fontSize: 10, opacity: 0.85 }}>神山ポイント</div>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: '16px 20px 4px' }}>
        <p style={{ fontSize: 14, color: COLORS.subtext }}>
          こんにちは、<strong style={{ color: COLORS.text }}>{profile.nickname}</strong> さん
        </p>
      </div>

      {/* Spots */}
      <div style={{ padding: '8px 16px' }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          今日のスポット
        </h2>
        {SPOTS.map((spot) => {
          const total = getTotalActiveForSpot(spot.id)
          const matches = getMatchCount(spot.id)
          return (
            <button
              key={spot.id}
              onClick={() => navigate(`/spot/${spot.id}`)}
              style={{
                width: '100%',
                background: COLORS.card,
                borderRadius: 16,
                padding: '16px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                textAlign: 'left',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                border: matches > 0 ? `1.5px solid ${COLORS.primary}` : `1.5px solid transparent`,
              }}
            >
              {/* Emoji */}
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: COLORS.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                flexShrink: 0,
              }}>
                {spot.emoji}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, marginBottom: 2 }}>
                  {spot.name}
                </div>
                <div style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 6 }}>
                  {spot.description}
                </div>
                {/* Badges */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: total > 0 ? '#E3F2FD' : COLORS.bg,
                    color: total > 0 ? '#1565C0' : COLORS.subtext,
                    fontWeight: 600,
                  }}>
                    👥 {total}人
                  </span>
                  {matches > 0 && (
                    <span style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 20,
                      background: COLORS.primaryLight,
                      color: COLORS.primary,
                      fontWeight: 700,
                    }}>
                      ★ {matches}人と共通の興味
                    </span>
                  )}
                </div>
              </div>

              <span style={{ color: COLORS.subtext, fontSize: 18 }}>›</span>
            </button>
          )
        })}
      </div>

      {/* Footer note */}
      <p style={{ textAlign: 'center', fontSize: 11, color: COLORS.subtext, padding: '8px 20px 4px' }}>
        スポットをタップして、今いる人を見てみよう
      </p>
    </div>
  )
}
