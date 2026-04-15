import { useState } from 'react'
import { TOUR_ROUTES, COLORS } from '../constants'

export default function RouteScreen() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{
        background: COLORS.primary,
        padding: '20px 20px 24px',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>🗺️ 神山ルート</h1>
        <p style={{ fontSize: 12, opacity: 0.8 }}>来訪者向けおすすめコース</p>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {/* Intro */}
        <div style={{
          background: COLORS.accentLight,
          borderRadius: 12,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: '#7B4F28',
          lineHeight: 1.6,
          borderLeft: `4px solid ${COLORS.accent}`,
        }}>
          🎒 学校説明会後の空き時間や、神山をはじめて訪れる方に向けたルートです。<br />
          各スポットには「今いる人」がいることも。声をかけてみてください。
        </div>

        {TOUR_ROUTES.map((route) => {
          const isOpen = expanded === route.id
          return (
            <div
              key={route.id}
              style={{
                background: COLORS.card,
                borderRadius: 16,
                marginBottom: 14,
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                border: `1.5px solid ${COLORS.border}`,
              }}
            >
              {/* Route header */}
              <button
                onClick={() => setExpanded(isOpen ? null : route.id)}
                style={{
                  width: '100%',
                  padding: '18px 16px',
                  background: 'none',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                    {route.name}
                  </h3>
                  <p style={{ fontSize: 12, color: COLORS.subtext, marginBottom: 6, lineHeight: 1.5 }}>
                    {route.description}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: COLORS.bg,
                    color: COLORS.subtext,
                    fontWeight: 600,
                  }}>
                    ⏱️ {route.totalDuration} · {route.stops.length}ヶ所
                  </span>
                </div>
                <span style={{ fontSize: 20, color: COLORS.subtext, marginLeft: 8, marginTop: 2 }}>
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {/* Stops */}
              {isOpen && (
                <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '8px 0 16px' }}>
                  {route.stops.map((stop, i) => (
                    <div key={i} style={{ padding: '10px 16px', display: 'flex', gap: 12 }}>
                      {/* Timeline */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: COLORS.primaryLight,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          flexShrink: 0,
                        }}>
                          {stop.emoji}
                        </div>
                        {i < route.stops.length - 1 && (
                          <div style={{ width: 2, flex: 1, background: COLORS.border, minHeight: 16, marginTop: 4 }} />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, paddingTop: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{stop.name}</span>
                          <span style={{ fontSize: 11, color: COLORS.subtext, background: COLORS.bg, padding: '2px 8px', borderRadius: 20 }}>
                            {stop.duration}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: COLORS.subtext, lineHeight: 1.5 }}>
                          {stop.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
