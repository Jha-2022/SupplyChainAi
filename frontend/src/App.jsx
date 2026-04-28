import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Messages from './components/Messages'
import RoutesPage from './components/RoutesPage'
import Inbox from './components/Inbox'
import Schedule from './components/Schedule'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'messages': return <Messages />;
      case 'routes': return <RoutesPage />;
      case 'inbox': return <Inbox />;
      case 'schedule': return <Schedule />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
