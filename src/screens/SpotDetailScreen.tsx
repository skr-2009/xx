import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { useCheckins } from '../hooks/useCheckins'
import { usePoints } from '../hooks/usePoints'
import { SPOTS, DUMMY_USERS, CONVERSATION_CARDS, COLORS } from '../constants'
import TagBadge from '../components/TagBadge'
import PointToast from '../components/PointToast'

const STATUS_EMOJI: Record<string, string> = {
  '話せます': '🟢',
  'ちょっとなら': '🟡',
  '作業中です': '🔴',
}

export default function SpotDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { getActiveCheckins, getMyActiveCheckin, checkout } = useCheckins()
  const { points, greet, hasGreeted } = usePoints()
  const [toast, setToast] = useState('')

  const spot = SPOTS.find((s) => s.id === id)
  if (!spot || !profile) return null

  const activeCheckins = getActiveCheckins(spot.id)
  const myCheckin = getMyActiveCheckin(profile.id)
  const isCheckedIn = myCheckin?.spotId === spot.id

  // 3 random conversation cards
  const cards = useMemo(() => {
    const shuffled = [...CONVERSATION_CARDS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot.id])

  const handleGreet = (userId: string) => {
    const success = greet(userId)
    if (success) setToast('+10 神山ポイント！')
    else setToast('すでに挨拶済みです')
  }

  const getUserForCheckin = (userId: string) =>
    DUMMY_USERS.find((u) => u.id === userId)

  const getCommonTags = (userTags: string[]) =>
    userTags.filter((t) => profile.tags.includes(t))

  return (
    <div style={{ paddingBottom: 100 }}>
      {toast && <PointToast message={toast} onDone={() => setToast('')} />}

      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '16px 20px 20px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: '#fff', fontSize: 22, padding: '0 4px' }}>
          ‹
        </button>
        <div>
          <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>スポット詳細</div>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>{spot.emoji} {spot.name}</h1>
        </div>
      </div>

      {/* Points bar */}
      <div style={{ background: COLORS.primaryLight, padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>
          💠 神山ポイント: {points}pt
        </span>
        <span style={{ fontSize: 11, color: COLORS.subtext }}>挨拶すると +10pt</span>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Today's people */}
        <h2 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          今いる人 ({activeCheckins.length}人)
        </h2>

        {activeCheckins.length === 0 ? (
          <div style={{
            background: COLORS.card,
            borderRadius: 14,
            padding: '24px',
            textAlign: 'center',
            color: COLORS.subtext,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
            <p style={{ fontSize: 13 }}>まだ誰もいません。<br />最初にチェックインしてみよう！</p>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            {activeCheckins.map((checkin) => {
              const isMe = checkin.userId === profile.id
              const user = isMe ? null : getUserForCheckin(checkin.userId)
              const commonTags = isMe ? [] : getCommonTags(user?.tags ?? [])
              const hasMatch = commonTags.length > 0

              return (
                <div
                  key={checkin.id}
                  style={{
                    background: COLORS.card,
                    borderRadius: 14,
                    padding: '14px',
                    marginBottom: 10,
                    border: hasMatch ? `1.5px solid ${COLORS.primary}` : `1.5px solid ${COLORS.border}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: hasMatch ? COLORS.primaryLight : COLORS.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0,
                    }}>
                      {isMe ? '😊' : (user?.emoji ?? '👤')}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>
                          {isMe ? `${profile.nickname}（あなた）` : (user?.nickname ?? '???')}
                        </span>
                        <span style={{
                          fontSize: 10,
                          padding: '2px 7px',
                          borderRadius: 20,
                          background: COLORS.bg,
                          color: COLORS.subtext,
                          fontWeight: 500,
                        }}>
                          {isMe ? profile.attribute : (user?.attribute ?? '')}
                        </span>
                        <span style={{ fontSize: 12 }}>
                          {STATUS_EMOJI[checkin.status] ?? '⚪'} {checkin.status}
                        </span>
                      </div>

                      {checkin.message && (
                        <p style={{ fontSize: 13, color: COLORS.subtext, marginBottom: 6 }}>
                          "{checkin.message}"
                        </p>
                      )}

                      {/* Tags */}
                      <div style={{ marginBottom: hasMatch ? 8 : 0 }}>
                        {(isMe ? profile.tags : (user?.tags ?? [])).map((tag) => (
                          <TagBadge key={tag} tag={tag} highlighted={profile.tags.includes(tag) && !isMe} small />
                        ))}
                      </div>

                      {/* Match indicator */}
                      {hasMatch && (
                        <div style={{
                          background: COLORS.primaryLight,
                          borderRadius: 8,
                          padding: '6px 10px',
                          marginBottom: 8,
                          fontSize: 12,
                          color: COLORS.primary,
                          fontWeight: 600,
                        }}>
                          ✨ 共通の興味: {commonTags.join('、')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Greet button */}
                  {!isMe && hasMatch && (
                    <button
                      onClick={() => handleGreet(checkin.userId)}
                      disabled={hasGreeted(checkin.userId)}
                      style={{
                        marginTop: 8,
                        width: '100%',
                        padding: '10px',
                        borderRadius: 10,
                        background: hasGreeted(checkin.userId) ? COLORS.bg : COLORS.primary,
                        color: hasGreeted(checkin.userId) ? COLORS.subtext : '#fff',
                        fontSize: 13,
                        fontWeight: 700,
                        border: 'none',
                      }}
                    >
                      {hasGreeted(checkin.userId) ? '✓ 挨拶済み' : '👋 話しかけた！ +10pt'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Conversation cards */}
        <h2 style={{ fontSize: 13, fontWeight: 700, color: COLORS.subtext, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          会話のきっかけ
        </h2>
        <div style={{ marginBottom: 24 }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 8,
                borderLeft: `4px solid ${COLORS.accent}`,
                fontSize: 14,
                color: COLORS.text,
                lineHeight: 1.5,
              }}
            >
              💬 {card}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action */}
      <div style={{
        position: 'fixed',
        bottom: 70,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        padding: '12px 16px',
        background: '#fff',
        borderTop: `1px solid ${COLORS.border}`,
      }}>
        {isCheckedIn ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              flex: 1,
              padding: '12px',
              borderRadius: 12,
              background: COLORS.primaryLight,
              color: COLORS.primary,
              fontSize: 13,
              fontWeight: 600,
              textAlign: 'center',
            }}>
              ✓ チェックイン中
            </div>
            <button
              onClick={() => checkout(profile.id)}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                background: COLORS.bg,
                color: COLORS.subtext,
                fontSize: 13,
                fontWeight: 600,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              退出
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/checkin/${spot.id}`)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: COLORS.primary,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(45,106,79,0.25)',
            }}
          >
            📍 このスポットにチェックインする
          </button>
        )}
      </div>
    </div>
  )
}
