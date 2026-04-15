import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { ALL_TAGS, COLORS } from '../constants'
import type { Profile } from '../types'

const ATTRIBUTES: Profile['attribute'][] = ['移住者', '学生', '地元民', '来訪者']
const ATTR_EMOJI: Record<string, string> = {
  '移住者': '🌿', '学生': '🎓', '地元民': '🏔️', '来訪者': '🎒'
}

export default function ProfileSetupScreen() {
  const { setProfile } = useProfile()
  const [nickname, setNickname] = useState('')
  const [attribute, setAttribute] = useState<Profile['attribute'] | ''>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [error, setError] = useState('')

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < 5
        ? [...prev, tag]
        : prev
    )
  }

  const handleSubmit = () => {
    if (!nickname.trim()) { setError('ニックネームを入力してください'); return }
    if (!attribute) { setError('属性を選んでください'); return }
    if (selectedTags.length === 0) { setError('興味タグを1つ以上選んでください'); return }
    setError('')
    setProfile({
      id: `me_${Date.now()}`,
      nickname: nickname.trim(),
      attribute,
      tags: selectedTags,
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '48px 24px 32px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🌿</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>KAMI EN</h1>
        <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
          神山町で、偶然のつながりを。<br />
          まずはあなたのことを教えてください。
        </p>
      </div>

      {/* Form */}
      <div style={{ padding: '28px 20px', flex: 1, maxWidth: 430, width: '100%', margin: '0 auto' }}>
        {/* Nickname */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            ニックネーム
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例：たろう"
            maxLength={12}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: `1.5px solid ${COLORS.border}`,
              fontSize: 16,
              background: '#fff',
            }}
          />
        </div>

        {/* Attribute */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.subtext, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            あなたは？
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {ATTRIBUTES.map((attr) => (
              <button
                key={attr}
                onClick={() => setAttribute(attr)}
                style={{
                  padding: '14px 8px',
                  borderRadius: 12,
                  background: attribute === attr ? COLORS.primary : '#fff',
                  color: attribute === attr ? '#fff' : COLORS.text,
                  border: `1.5px solid ${attribute === attr ? COLORS.primary : COLORS.border}`,
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>{ATTR_EMOJI[attr]}</span>
                <span>{attr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: COLORS.subtext, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
            興味・関心タグ（最大5つ）
          </label>
          <p style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 10 }}>
            選んだタグが、他のユーザーとのマッチングに使われます
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ALL_TAGS.map((tag) => {
              const selected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    background: selected ? COLORS.primary : '#fff',
                    color: selected ? '#fff' : COLORS.text,
                    border: `1.5px solid ${selected ? COLORS.primary : COLORS.border}`,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
          {selectedTags.length > 0 && (
            <p style={{ fontSize: 12, color: COLORS.primary, marginTop: 8, fontWeight: 600 }}>
              選択中: {selectedTags.join('、')}
            </p>
          )}
        </div>

        {error && (
          <p style={{ color: '#E63946', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>
        )}

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
          KAMI EN をはじめる →
        </button>
      </div>
    </div>
  )
}
