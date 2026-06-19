import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Confetti = () => {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360,
    }))
    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            background: ['#00d4ff', '#b366ff', '#00ff88', '#ff006e'][Math.floor(Math.random() * 4)],
            boxShadow: '0 0 10px currentColor',
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 1, 0],
            rotate: piece.rotation,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
