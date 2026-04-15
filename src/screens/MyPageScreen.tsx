import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { useCheckins } from '../hooks/useCheckins'
import { usePoints } from '../hooks/usePoints'
import { SPOTS, COLORS } from '../constants'
import TagBadge from '../components/TagBadge'

const ATTR_EMOJI: Record<string, string> = {
  '移住者': '🌿', '学生': '🎓', '地元民': '🏔️', '来訪者': '🎒'
}

const POINT_LEVELS = [
  { min: 0, label: 'はじめましてレベル', emoji: '🌱' },
  { min: 30, label: 'なじんできたレベル', emoji: '🌿' },
  { min: 80, label: 'ご近所さんレベル', emoji: '🏡' },
  { min: 150, label: '神山人レベル', emoji: '🏔️' },
]

export default function MyPageScreen() {
  const { profile, setProfile } = useProfile()
  const { getMyActiveCheckin, checkout } = useCheckins()
  const { points } = usePoints()
  const [confirmReset, setConfirmReset] = useState(false)

  if (!profile) return null

  const myCheckin = getMyActiveCheckin(profile.id)
  const checkinSpot = myCheckin ? SPOTS.find((s) => s.id === myCheckin.spotId) : null

  const level = [...POINT_LEVELS].reverse().find((l) => points >= l.min) ?? POINT_LEVELS[0]
  const nextLevel = POINT_LEVELS.find((l) => l.min > points)
  const progressToNext = nextLevel
    ? Math.min(100, Math.round(((points - (level.min)) / (nextLevel.min - level.min)) * 100))
    : 100

  const handleReset = () => {
    if (confirmReset) {
      localStorage.clear()
      window.location.reload()
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
    }
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '20px 20px 28px',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          margin: '0 auto 12px',
        }}>
          {ATTR_EMOJI[profile.attribute] ?? '👤'}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{profile.nickname}</h2>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.2)',
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
        }}>
          {profile.attribute}
        </span>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Points card */}
        <div style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: '18px',
          marginBottom: 14,
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1 }}>
              神山ポイント
            </h3>
            <span style={{ fontSize: 11, color: COLORS.subtext }}>挨拶・チェックインで貯まる</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: COLORS.primary }}>{points}</span>
            <span style={{ fontSize: 14, color: COLORS.subtext }}>pt</span>
          </div>

          {/* Level */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{level.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{level.label}</span>
          </div>

          {/* Progress bar */}
          {nextLevel && (
            <>
              <div style={{
                background: COLORS.bg,
                borderRadius: 4,
                height: 6,
                marginBottom: 4,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressToNext}%`,
                  background: COLORS.primary,
                  borderRadius: 4,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <p style={{ fontSize: 11, color: COLORS.subtext }}>
                次のレベルまで あと {nextLevel.min - points}pt（{nextLevel.emoji} {nextLevel.label}）
              </p>
            </>
          )}

          {/* How to earn */}
          <div style={{ marginTop: 12, fontSize: 11, color: COLORS.subtext, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>📍 チェックイン: +10pt</span>
            <span>👋 挨拶する: +10pt</span>
          </div>
        </div>

        {/* Current checkin */}
        <div style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: '16px',
          marginBottom: 14,
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            チェックイン状況
          </h3>
          {checkinSpot ? (
            <div>
              <p style={{ fontSize: 14, color: COLORS.text, marginBottom: 4 }}>
                {checkinSpot.emoji} <strong>{checkinSpot.name}</strong> にいます
              </p>
              <p style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 12 }}>
                ステータス: {myCheckin!.status}
                {myCheckin!.message ? `　"${myCheckin!.message}"` : ''}
              </p>
              <button
                onClick={() => checkout(profile.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  background: COLORS.bg,
                  color: COLORS.subtext,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                チェックアウト
              </button>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: COLORS.subtext }}>現在チェックイン中のスポットはありません</p>
          )}
        </div>

        {/* Tags */}
        <div style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: '16px',
          marginBottom: 14,
          boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            あなたの興味タグ
          </h3>
          <div>
            {profile.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} highlighted />
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 10,
            background: 'none',
            color: confirmReset ? '#E63946' : COLORS.subtext,
            fontSize: 13,
            border: `1px solid ${confirmReset ? '#E63946' : COLORS.border}`,
            fontWeight: confirmReset ? 700 : 400,
          }}
        >
          {confirmReset ? '⚠️ もう一度タップで初期化します' : 'プロフィールをリセット'}
        </button>
      </div>
    </div>
  )
}
