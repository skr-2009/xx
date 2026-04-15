import { useLocation, useNavigate } from 'react-router-dom'
import { COLORS } from '../constants'

const TABS = [
  { path: '/', label: 'スポット', icon: '📍' },
  { path: '/events', label: 'イベント', icon: '🗓️' },
  { path: '/routes', label: 'ルート', icon: '🗺️' },
  { path: '/mypage', label: 'マイページ', icon: '👤' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        background: '#fff',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        zIndex: 100,
      }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.path)
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              padding: '10px 0 12px',
              background: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: active ? COLORS.primary : COLORS.subtext,
              borderTop: active ? `2px solid ${COLORS.primary}` : '2px solid transparent',
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
