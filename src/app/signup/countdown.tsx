"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()

    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Countdown to Launch</h3>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col rounded-md bg-background p-2 shadow-sm">
          <span className="text-2xl font-bold">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">Days</span>
        </div>
        <div className="flex flex-col rounded-md bg-background p-2 shadow-sm">
          <span className="text-2xl font-bold">{timeLeft.hours}</span>
          <span className="text-xs text-muted-foreground">Hours</span>
        </div>
        <div className="flex flex-col rounded-md bg-background p-2 shadow-sm">
          <span className="text-2xl font-bold">{timeLeft.minutes}</span>
          <span className="text-xs text-muted-foreground">Minutes</span>
        </div>
        <div className="flex flex-col rounded-md bg-background p-2 shadow-sm">
          <span className="text-2xl font-bold">{timeLeft.seconds}</span>
          <span className="text-xs text-muted-foreground">Seconds</span>
        </div>
      </div>
    </div>
  )
}

