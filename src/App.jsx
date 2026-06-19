import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import Dashboard from './components/Dashboard'
import CalendarView from './components/CalendarView'
import { useChallenge } from './hooks/useChallenge'

function App() {
  const { challenge, acceptChallenge, isAccepted, currentDay } = useChallenge()
  const [view, setView] = useState('intro')
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!isAccepted) return

    const interval = setInterval(() => {
      const startDate = new Date('2026-06-20')
      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 21)
      const now = new Date()
      const diff = endDate - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isAccepted])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <IntroScreen key="intro" onAccept={acceptChallenge} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-neon-cyan/20">
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <motion.h1
                  className="text-2xl font-bold gradient-text"
                  animate={{ opacity: 1 }}
                >
                  🔥 21 DAY MASTER
                </motion.h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => setView('dashboard')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      view === 'dashboard'
                        ? 'bg-neon-cyan/20 text-neon-cyan neon-border'
                        : 'text-gray-400 hover:text-neon-cyan'
                    }`}
                  >
                    🎯 Dashboard
                  </button>
                  <button
                    onClick={() => setView('calendar')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      view === 'calendar'
                        ? 'bg-neon-cyan/20 text-neon-cyan neon-border'
                        : 'text-gray-400 hover:text-neon-cyan'
                    }`}
                  >
                    📅 Calendar
                  </button>
                </div>
              </div>
            </nav>

            <div className="pt-20">
              {view === 'dashboard' && (
                <Dashboard
                  currentDay={currentDay}
                  timeLeft={timeLeft}
                  challenge={challenge}
                />
              )}
              {view === 'calendar' && <CalendarView challenge={challenge} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
