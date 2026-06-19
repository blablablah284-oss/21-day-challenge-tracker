import React, { useState } from 'react'
import { motion } from 'framer-motion'

const MissionCard = ({
  icon,
  title,
  subtitle,
  isCompleted,
  onComplete,
  onFail,
  showWhy,
  customContent,
}) => {
  const [reason, setReason] = useState('')

  return (
    <motion.div
      className={`glass neon-border p-6 rounded-2xl transition-all ${
        isCompleted ? 'bg-neon-green/5 border-neon-green/30 shadow-[0_0_20px_rgba(0,255,136,0.3)]' : ''
      }`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <motion.div className="text-5xl mb-3" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-neon-cyan">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-4xl"
          >
            ✅
          </motion.div>
        )}
      </div>

      {/* Custom Content */}
      {customContent}

      {/* Action Buttons */}
      {!showWhy && (
        <motion.div className="flex gap-3 mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <motion.button
            onClick={onComplete}
            className="flex-1 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-bg font-bold py-2 rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✅ COMPLETE
          </motion.button>
          <motion.button
            onClick={onFail}
            className="flex-1 bg-dark-border/50 border border-neon-pink/30 text-neon-pink font-bold py-2 rounded-lg hover:bg-neon-pink/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❌ FAILED
          </motion.button>
        </motion.div>
      )}

      {/* Why Modal */}
      {showWhy && (
        <motion.div
          className="mt-6 p-4 bg-neon-pink/10 border border-neon-pink/30 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-neon-pink font-bold mb-3">❗ Why did you fail?</p>
          <input
            type="text"
            placeholder="Enter reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-dark-border/50 border border-neon-pink/30 rounded px-3 py-2 text-white text-sm mb-3"
          />
          <motion.button
            onClick={() => {
              if (reason.trim()) {
                setReason('')
              }
            }}
            className="w-full bg-neon-pink/20 text-neon-pink font-bold py-2 rounded hover:bg-neon-pink/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SUBMIT
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MissionCard
