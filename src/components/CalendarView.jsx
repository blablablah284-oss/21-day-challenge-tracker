import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CalendarView = ({ challenge }) => {
  const startDate = new Date('2026-06-20')
  const days = []

  for (let i = 0; i < 21; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    days.push(date)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-4xl font-bold gradient-text mb-8">📅 Challenge Calendar</motion.h2>

      <motion.div className="grid grid-cols-3 md:grid-cols-7 gap-4" variants={containerVariants}>
        {days.map((date, idx) => (
          <motion.div
            key={idx}
            variants={dayVariants}
            className="glass neon-border p-4 rounded-xl text-center hover:shadow-neon transition-all cursor-pointer group"
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
          >
            <p className="text-neon-cyan font-bold text-lg">Day {idx + 1}</p>
            <p className="text-gray-400 text-xs mt-1">{date.toLocaleDateString()}</p>
            <motion.div
              className="mt-3 text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {idx < 3 ? '🟢' : idx < 7 ? '🟡' : '⚪'}
            </motion.div>
            <p className="text-xs text-gray-500 mt-2">4/4 Missions</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default CalendarView
