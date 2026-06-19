import React from 'react'
import { motion } from 'framer-motion'
import Confetti from './Confetti'

const missions = [
  { id: 1, icon: '🔥', title: 'NO FAP', subtitle: 'Control your mind, control your destiny' },
  { id: 2, icon: '😴', title: 'BETTER SLEEP', subtitle: 'Recovery is growth' },
  { id: 3, icon: '🥗', title: 'NO UNHEALTHY FOOD', subtitle: 'Fuel your body right' },
  { id: 4, icon: '📚', title: 'STUDY', subtitle: 'Even 1 second counts' },
]

const IntroScreen = ({ onAccept }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const handleAccept = () => {
    onAccept()
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0,212,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(179,102,255,0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        className="max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-7xl md:text-8xl font-black mb-4 gradient-text"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            21 DAY
          </motion.h1>
          <motion.h2
            className="text-5xl md:text-7xl font-black text-neon-cyan mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
          >
            MASTER CHALLENGE
          </motion.h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
        >
          Your next 21 days will change <span className="text-neon-cyan font-bold">EVERYTHING</span>
        </motion.p>

        {/* Mission Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {missions.map((mission, idx) => (
            <motion.div
              key={mission.id}
              variants={itemVariants}
              className="glass neon-border p-6 rounded-2xl cursor-pointer group hover:shadow-neon transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
            >
              <motion.div
                className="text-6xl mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                {mission.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-neon-cyan mb-2">{mission.title}</h3>
              <p className="text-gray-400 text-sm">{mission.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleAccept}
          className="px-12 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-bg font-black text-xl rounded-xl shadow-neon hover:shadow-lg transition-all neon-border relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          ⚡ ACCEPT CHALLENGE ⚡
        </motion.button>

        {/* Footer text */}
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-sm mt-8"
        >
          Starting: June 20, 2026 | Ending: July 10, 2026 | 21 Days of Pure Transformation 🚀
        </motion.p>
      </motion.div>

      <Confetti />
    </motion.div>
  )
}

export default IntroScreen
