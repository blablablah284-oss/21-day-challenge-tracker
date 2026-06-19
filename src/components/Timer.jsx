import React from 'react'
import { motion } from 'framer-motion'

const Timer = ({ timeLeft }) => {
  const timerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  return (
    <motion.div
      className="glass neon-border p-6 rounded-xl"
      variants={timerVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-gray-400 text-sm mb-3 font-bold">⏱️ TIME REMAINING</p>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINS', value: timeLeft.minutes },
          { label: 'SECS', value: timeLeft.seconds },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-b from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 rounded-lg p-3 text-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
          >
            <motion.p className="text-2xl font-black text-neon-cyan">
              {String(item.value).padStart(2, '0')}
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Timer
