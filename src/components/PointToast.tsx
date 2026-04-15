import { useEffect } from 'react'
import { COLORS } from '../constants'

interface Props {
  message?: string
  onDone: () => void
}

export default function PointToast({ message = '+10 神山ポイント！', onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: COLORS.primary,
        color: '#fff',
        padding: '18px 36px',
        borderRadius: 16,
        fontSize: 20,
        fontWeight: 700,
        zIndex: 9999,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        pointerEvents: 'none',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      🎉 {message}
    </div>
  )
}
