"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  seconds: number
  onComplete: () => void
}

export function CountdownTimer({ seconds, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onComplete])

  useEffect(() => {
    setTimeLeft(seconds)
  }, [seconds])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return <span>{formatTime(timeLeft)}</span>
}

