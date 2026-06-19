import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MissionCard from './MissionCard'
import Timer from './Timer'

const Dashboard = ({ currentDay, timeLeft, challenge }) => {
  const [missions, setMissions] = useState({
    noFap: { completed: false, showWhy: false },
    betterSleep: { hours: 0, minutes: 0, showWhy: false, reason: '' },
    noUnhealthyFood: { items: [], showWhy: false },
    study: { hours: 0, minutes: 0, topics: '', showWhy: false },
  })

  const noFapQuotes = [
    '"A man who controls his desires controls his destiny." - Ancient Wisdom',
    '"The master has failed more times than the beginner has even tried." - Stephen McCranie',
    '"Your body is a temple. Respect it." - Marcus Aurelius',
    '"The only way out is through. Keep pushing." - Unknown',
    '"You are stronger than your urges." - Motivation',
    '"Every day you resist is a victory." - Champion Mindset',
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  const completeMission = (missionKey) => {
    if (missionKey === 'noFap') {
      setCurrentQuote((prev) => (prev + 1) % noFapQuotes.length)
    }
    setMissions((prev) => ({
      ...prev,
      [missionKey]: { ...prev[missionKey], completed: true, showWhy: false },
    }))
  }

  const failMission = (missionKey) => {
    setMissions((prev) => ({
      ...prev,
      [missionKey]: { ...prev[missionKey], showWhy: true },
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="glass neon-border p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <motion.h2 className="text-5xl font-black gradient-text mb-2">
                DAY {currentDay}/21
              </motion.h2>
              <p className="text-gray-400 text-lg">Today: {new Date().toLocaleDateString()}</p>
            </div>
            {timeLeft && <Timer timeLeft={timeLeft} />}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <motion.div
              className="h-2 bg-dark-border rounded-full overflow-hidden"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentDay / 21) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <p className="text-sm text-gray-400 mt-2">Challenge Progress</p>
          </div>
        </div>
      </motion.div>

      {/* Missions Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
      >
        {/* NO FAP */}
        <motion.div variants={itemVariants}>
          <MissionCard
            icon="🔥"
            title="NO FAP"
            subtitle="Control your mind"
            isCompleted={missions.noFap.completed}
            onComplete={() => completeMission('noFap')}
            onFail={() => failMission('noFap')}
            showWhy={missions.noFap.showWhy}
            customContent={
              missions.noFap.completed && (
                <motion.div
                  className="mt-6 p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-neon-cyan font-bold text-sm italic">{noFapQuotes[currentQuote]}</p>
                </motion.div>
              )
            }
          />
        </motion.div>

        {/* BETTER SLEEP */}
        <motion.div variants={itemVariants}>
          <MissionCard
            icon="😴"
            title="BETTER SLEEP"
            subtitle="Recovery is growth"
            isCompleted={missions.betterSleep.hours >= 7}
            onComplete={() => completeMission('betterSleep')}
            onFail={() => failMission('betterSleep')}
            showWhy={missions.betterSleep.showWhy && missions.betterSleep.hours < 7}
            customContent={
              <motion.div className="mt-4 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={missions.betterSleep.hours}
                    onChange={(e) =>
                      setMissions((prev) => ({
                        ...prev,
                        betterSleep: { ...prev.betterSleep, hours: parseInt(e.target.value) || 0 },
                      }))
                    }
                    placeholder="Hours"
                    className="flex-1 bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={missions.betterSleep.minutes}
                    onChange={(e) =>
                      setMissions((prev) => ({
                        ...prev,
                        betterSleep: { ...prev.betterSleep, minutes: parseInt(e.target.value) || 0 },
                      }))
                    }
                    placeholder="Minutes"
                    className="flex-1 bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                {missions.betterSleep.hours > 0 || missions.betterSleep.minutes > 0 ? (
                  <p className="text-neon-cyan font-bold text-lg">
                    {missions.betterSleep.hours}h {missions.betterSleep.minutes}m
                  </p>
                ) : null}
              </motion.div>
            }
          />
        </motion.div>

        {/* NO UNHEALTHY FOOD */}
        <motion.div variants={itemVariants}>
          <MissionCard
            icon="🥗"
            title="NO UNHEALTHY FOOD"
            subtitle="Fuel your body right"
            isCompleted={missions.noUnhealthyFood.items.length === 0}
            onComplete={() => completeMission('noUnhealthyFood')}
            onFail={() => failMission('noUnhealthyFood')}
            customContent={
              <motion.div className="mt-4 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <input
                  type="text"
                  placeholder="List all food items (comma separated)"
                  onBlur={(e) => {
                    const items = e.target.value.split(',').filter((i) => i.trim())
                    setMissions((prev) => ({
                      ...prev,
                      noUnhealthyFood: { ...prev.noUnhealthyFood, items },
                    }))
                  }}
                  className="w-full bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                />
                {missions.noUnhealthyFood.items.length > 0 && (
                  <div className="text-sm text-gray-400">
                    <p className="font-bold text-neon-cyan mb-2">Items logged:</p>
                    {missions.noUnhealthyFood.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-gray-300">• {item.trim()}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            }
          />
        </motion.div>

        {/* STUDY */}
        <motion.div variants={itemVariants}>
          <MissionCard
            icon="📚"
            title="STUDY"
            subtitle="Even 1 second counts"
            isCompleted={missions.study.hours > 0 || missions.study.minutes > 0}
            onComplete={() => completeMission('study')}
            onFail={() => failMission('study')}
            customContent={
              <motion.div className="mt-4 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    value={missions.study.hours}
                    onChange={(e) =>
                      setMissions((prev) => ({
                        ...prev,
                        study: { ...prev.study, hours: parseInt(e.target.value) || 0 },
                      }))
                    }
                    placeholder="Hours"
                    className="flex-1 bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={missions.study.minutes}
                    onChange={(e) =>
                      setMissions((prev) => ({
                        ...prev,
                        study: { ...prev.study, minutes: parseInt(e.target.value) || 0 },
                      }))
                    }
                    placeholder="Minutes"
                    className="flex-1 bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={missions.study.topics}
                  onChange={(e) =>
                    setMissions((prev) => ({
                      ...prev,
                      study: { ...prev.study, topics: e.target.value },
                    }))
                  }
                  placeholder="What did you study?"
                  className="w-full bg-dark-border/50 border border-neon-cyan/20 rounded px-3 py-2 text-white text-sm"
                />
              </motion.div>
            }
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
