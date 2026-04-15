import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useProfile } from './hooks/useProfile'
import ProfileSetupScreen from './screens/ProfileSetupScreen'
import HomeScreen from './screens/HomeScreen'
import SpotDetailScreen from './screens/SpotDetailScreen'
import CheckinScreen from './screens/CheckinScreen'
import EventsScreen from './screens/EventsScreen'
import RouteScreen from './screens/RouteScreen'
import MyPageScreen from './screens/MyPageScreen'
import BottomNav from './components/BottomNav'

function AppInner() {
  const { profile } = useProfile()

  if (!profile) {
    return <ProfileSetupScreen />
  }

  return (
    <div style={{
      maxWidth: 430,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#EDECEA',
      position: 'relative',
      paddingBottom: 70,
    }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/spot/:id" element={<SpotDetailScreen />} />
        <Route path="/checkin/:spotId" element={<CheckinScreen />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="/routes" element={<RouteScreen />} />
        <Route path="/mypage" element={<MyPageScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
