import { useState, useEffect } from 'react'

const useChallenge = () => {
  const [isAccepted, setIsAccepted] = useState(() => {
    const saved = localStorage.getItem('challengeAccepted')
    return saved ? JSON.parse(saved) : false
  })

  const [challenge, setChallenge] = useState(() => {
    const saved = localStorage.getItem('challengeData')
    return saved
      ? JSON.parse(saved)
      : {
          startDate: '2026-06-20',
          days: {},
        }
  })

  const [currentDay, setCurrentDay] = useState(1)

  useEffect(() => {
    if (isAccepted) {
      const startDate = new Date('2026-06-20')
      const today = new Date()
      const diffTime = today - startDate
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
      setCurrentDay(Math.min(Math.max(diffDays, 1), 21))
    }
  }, [isAccepted])

  useEffect(() => {
    localStorage.setItem('challengeAccepted', JSON.stringify(isAccepted))
    localStorage.setItem('challengeData', JSON.stringify(challenge))
  }, [isAccepted, challenge])

  const acceptChallenge = () => {
    setIsAccepted(true)
  }

  return {
    challenge,
    setChallenge,
    isAccepted,
    acceptChallenge,
    currentDay,
  }
}

export default useChallenge
