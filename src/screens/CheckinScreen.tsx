import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { useCheckins } from '../hooks/useCheckins'
import { usePoints } from '../hooks/usePoints'
import { SPOTS, COLORS } from '../constants'
import PointToast from '../components/PointToast'

const STATUSES = ['話せます', 'ちょっとなら', '作業中です']
const STATUS_DESC: Record<string, string> = {
  '話せます': '誰とでも話せます 🟢',
  'ちょっとなら': '短い会話なら大丈夫 🟡',
  '作業中です': '声をかけるならそっと 🔴',
}

export default function CheckinScreen() {
  const { spotId } = useParams<{ spotId: string }>()
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { checkin } = useCheckins()
  const { addPoints } = usePoints()
  const [status, setStatus] = useState('話せます')
  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const spot = SPOTS.find((s) => s.id === spotId)
  if (!spot || !profile) return null

  const handleSubmit = () => {
    checkin({
      userId: profile.id,
      spotId: spot.id,
      status,
      message: message.trim(),
    })
    addPoints(10)
    setShowToast(true)
  }

  if (showToast) {
    return (
      <div style={{ minHeight: '100vh', background: COLORS.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <PointToast
          message="+10 神山ポイント！"
          onDone={() => navigate(`/spot/${spot.id}`)}
        />
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary, marginBottom: 8 }}>
            チェックイン完了！
          </h2>
          <p style={{ fontSize: 14, color: COLORS.subtext }}>
            {spot.name} にいることを知らせました
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg }}>
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
          <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 2 }}>チェックイン</div>
          <h1 style={{ fontSize: 18, fontWeight: 800 }}>{spot.emoji} {spot.name}</h1>
        </div>
      </div>

      <div style={{ padding: '24px 16px' }}>
        {/* Status */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.subtext, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
            今の状態
          </label>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 12,
                background: status === s ? COLORS.primary : COLORS.card,
                color: status === s ? '#fff' : COLORS.text,
                border: `1.5px solid ${status === s ? COLORS.primary : COLORS.border}`,
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'left',
                marginBottom: 8,
              }}
            >
              {STATUS_DESC[s]}
            </button>
          ))}
        </div>

        {/* Message */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            ひとこと（任意）
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="例：農業の話がしたい、ジャズ好きな方いませんか？"
            maxLength={60}
            rows={3}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              fontSize: 14,
              background: COLORS.card,
              resize: 'none',
              lineHeight: 1.6,
            }}
          />
          <p style={{ fontSize: 11, color: COLORS.subtext, textAlign: 'right', marginTop: 4 }}>
            {message.length}/60
          </p>
        </div>

        {/* Info */}
        <div style={{
          background: COLORS.primaryLight,
          borderRadius: 12,
          padding: '12px 14px',
          marginBottom: 24,
          fontSize: 12,
          color: COLORS.primary,
          lineHeight: 1.6,
        }}>
          📌 チェックインは1時間で自動的に終了します<br />
          💠 チェックインすると +10 神山ポイントもらえます
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            background: COLORS.primary,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(45,106,79,0.3)',
          }}
        >
          チェックインする →
        </button>
      </div>
    </div>
  )
}
