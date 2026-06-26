"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, RotateCcw } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

const zodiacSigns = [
  { name: "Aries", symbol: "♈", start: "03-21", end: "04-19" },
  { name: "Taurus", symbol: "♉", start: "04-20", end: "05-20" },
  { name: "Gemini", symbol: "♊", start: "05-21", end: "06-20" },
  { name: "Cancer", symbol: "♋", start: "06-21", end: "07-22" },
  { name: "Leo", symbol: "♌", start: "07-23", end: "08-22" },
  { name: "Virgo", symbol: "♍", start: "08-23", end: "09-22" },
  { name: "Libra", symbol: "♎", start: "09-23", end: "10-22" },
  { name: "Scorpio", symbol: "♏", start: "10-23", end: "11-21" },
  { name: "Sagittarius", symbol: "♐", start: "11-22", end: "12-21" },
  { name: "Capricorn", symbol: "♑", start: "12-22", end: "01-19" },
  { name: "Aquarius", symbol: "♒", start: "01-20", end: "02-18" },
  { name: "Pisces", symbol: "♓", start: "02-19", end: "03-20" },
]

function getZodiac(date: Date) {
  const mmdd = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  for (const sign of zodiacSigns) {
    if (mmdd >= sign.start && mmdd <= sign.end) return sign
  }
  return zodiacSigns[9]
}

export default function AgeCalculator() {
  const { reset: resetCtx } = useToolContext()
  const [dob, setDob] = useState("")
  const [calculated, setCalculated] = useState(false)
  const [, setTick] = useState(0)

  const birthDate = useMemo(() => (dob ? new Date(dob) : null), [dob])

  const age = useMemo(() => {
    if (!birthDate) return null
    const now = new Date()
    let years = now.getFullYear() - birthDate.getFullYear()
    let months = now.getMonth() - birthDate.getMonth()
    let days = now.getDate() - birthDate.getDate()
    let hours = now.getHours() - birthDate.getHours()
    let minutes = now.getMinutes() - birthDate.getMinutes()
    let seconds = now.getSeconds() - birthDate.getSeconds()

    if (seconds < 0) { seconds += 60; minutes-- }
    if (minutes < 0) { minutes += 60; hours-- }
    if (hours < 0) { hours += 24; days-- }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += prevMonth.getDate()
      months--
    }
    if (months < 0) { months += 12; years-- }

    const diff = now.getTime() - birthDate.getTime()
    const totalMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44))
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const totalHours = Math.floor(diff / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diff / (1000 * 60))

    const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (nextBirthday < now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    return { years, months, days, hours, minutes, seconds, totalMonths, totalDays, totalHours, totalMinutes, daysUntilBirthday }
  }, [birthDate])

  useEffect(() => {
    if (!calculated || !birthDate) return
    const timer = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [calculated, birthDate])

  const calculate = useCallback(() => {
    if (dob) setCalculated(true)
  }, [dob])

  const reset = useCallback(() => {
    setDob("")
    setCalculated(false)
    resetCtx()
  }, [resetCtx])

  const zodiac = birthDate ? getZodiac(birthDate) : null

  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Date of Birth
        </label>
        <Input
          type="date"
          value={dob}
          onChange={(e) => { setDob(e.target.value); setCalculated(false) }}
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={calculate} icon={<Calendar className="size-4" />}>
          Calculate Age
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {calculated && age && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <AgeCard label="Years" value={age.years} />
            <AgeCard label="Months" value={age.months} />
            <AgeCard label="Days" value={age.days} />
            <AgeCard label="Hours" value={age.hours} />
            <AgeCard label="Minutes" value={age.minutes} />
            <AgeCard label="Seconds" value={age.seconds} />
          </div>

          {zodiac && (
            <Card>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{zodiac.symbol}</span>
                <div>
                  <p className="text-xs text-muted-foreground">Zodiac Sign</p>
                  <p className="text-lg font-semibold text-foreground">{zodiac.name}</p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <AgeCard label="Total Months" value={age.totalMonths.toLocaleString()} />
            <AgeCard label="Total Days" value={age.totalDays.toLocaleString()} />
            <AgeCard label="Total Hours" value={age.totalHours.toLocaleString()} />
            <AgeCard label="Total Minutes" value={age.totalMinutes.toLocaleString()} />
          </div>

          <Card>
            <p className="text-xs text-muted-foreground mb-1">Next Birthday</p>
            <p className="text-xl font-bold text-primary">
              {age.daysUntilBirthday > 0
                ? `${age.daysUntilBirthday} days away`
                : age.daysUntilBirthday === 0
                  ? "Today!"
                  : "Passed"}
            </p>
          </Card>
        </motion.div>
      )}

      {!calculated && (
        <EmptyState
          icon={<Calendar className="size-8" />}
          title="Enter your date of birth"
          description="Select your DOB and click Calculate Age"
        />
      )}
    </div>
  )
}

function AgeCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-border bg-card p-4 text-center shadow-soft"
    >
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </motion.div>
  )
}
