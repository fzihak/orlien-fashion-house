'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { sounds } from '@/lib/sound-utils'
import { useAppState } from '@/lib/state-context'

interface SchedulerProps {
  selectedDate: string
  selectedTime: string
  onSelectDate: (date: string) => void
  onSelectTime: (time: string) => void
}

interface CalendarDay {
  dateString: string
  dayName: string
  dayNum: string
  monthName: string
  status: 'available' | 'limited' | 'full' | 'closed'
  slotsLeft: number
}

export default function AtelierScheduler({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime
}: SchedulerProps) {
  const { soundEnabled } = useAppState()
  const [days, setDays] = useState<CalendarDay[]>([])

  // Generate 14 rolling calendar days starting from today
  useEffect(() => {
    const calendarDays: CalendarDay[] = []
    const today = new Date()

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    for (let i = 0; i < 14; i++) {
      const futureDate = new Date(today)
      futureDate.setDate(today.getDate() + i)

      const yyyy = futureDate.getFullYear()
      const mm = String(futureDate.getMonth() + 1).padStart(2, '0')
      const dd = String(futureDate.getDate()).padStart(2, '0')
      const dateString = `${yyyy}-${mm}-${dd}`

      const dayOfWeekIdx = futureDate.getDay()
      const dayName = dayNames[dayOfWeekIdx]
      const dayNum = String(futureDate.getDate())
      const monthName = monthNames[futureDate.getMonth()]

      // Mock booking metrics based on day index
      let status: 'available' | 'limited' | 'full' | 'closed' = 'available'
      let slotsLeft = 5

      if (dayOfWeekIdx === 0) {
        status = 'closed'
        slotsLeft = 0
      } else if (i % 4 === 1) {
        status = 'full'
        slotsLeft = 0
      } else if (i % 3 === 0) {
        status = 'limited'
        slotsLeft = Math.floor(Math.random() * 2) + 1
      } else {
        slotsLeft = Math.floor(Math.random() * 3) + 3
      }

      calendarDays.push({
        dateString,
        dayName,
        dayNum,
        monthName,
        status,
        slotsLeft
      })
    }
    setDays(calendarDays)

    // Pre-select first available date if none selected
    const firstAvailable = calendarDays.find(d => d.status !== 'full' && d.status !== 'closed')
    if (firstAvailable && !selectedDate) {
      onSelectDate(firstAvailable.dateString)
    }
  }, [])

  const handleDateClick = (day: CalendarDay) => {
    if (day.status === 'full' || day.status === 'closed') return
    if (soundEnabled) sounds.playClick()
    onSelectDate(day.dateString)
  }

  const handleTimeClick = (timeStr: string) => {
    if (soundEnabled) sounds.playSweep()
    onSelectTime(timeStr)
  }

  const timeSlots = [
    { time: '10:00 AM', label: 'Morning Fit' },
    { time: '11:30 AM', label: 'Mid-Morning' },
    { time: '01:00 PM', label: 'Lunch Session' },
    { time: '03:30 PM', label: 'Afternoon Capsule' },
    { time: '05:00 PM', label: 'Twilight Ledger' }
  ]

  // Format date display (e.g. "Monday, June 8")
  const getSelectedDateLabel = () => {
    if (!selectedDate) return 'No Date Selected'
    const d = new Date(selectedDate)
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1">
        <h4 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>1. Select Fitting Date</span>
        </h4>
        <p className="text-xs text-muted-foreground font-light">
          Appointments are calibrated two weeks in advance. Weekends are reserved for workshop maintenance.
        </p>
      </div>

      {/* 14 Day Horizontal Calendar Slider */}
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {days.map((day) => {
          const isSelected = selectedDate === day.dateString
          const isClosed = day.status === 'closed'
          const isFull = day.status === 'full'
          const isLimited = day.status === 'limited'

          return (
            <button
              key={day.dateString}
              type="button"
              disabled={isClosed || isFull}
              onClick={() => handleDateClick(day)}
              className={`flex flex-col items-center justify-between p-3.5 rounded-2xl w-20 shrink-0 border transition-all text-center select-none ${
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10 scale-105 font-bold z-10'
                  : isClosed
                    ? 'opacity-30 bg-secondary/10 border-border/40 cursor-not-allowed'
                    : isFull
                      ? 'bg-red-500/5 border-red-500/20 text-red-400/60 cursor-not-allowed opacity-50'
                      : 'bg-card/40 border-border/60 text-foreground hover:border-foreground/45 hover:bg-card/70'
              }`}
            >
              <span className={`text-[9px] uppercase tracking-wider font-mono ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {day.dayName}
              </span>
              <span className="text-xl font-black font-heading my-1 tracking-tight">
                {day.dayNum}
              </span>
              <span className={`text-[9px] uppercase tracking-wider font-mono ${isSelected ? 'text-primary-foreground/90' : 'text-foreground'}`}>
                {day.monthName}
              </span>

              {/* Status Indicator Bar */}
              <div className="w-full mt-2.5 flex justify-center">
                {isClosed ? (
                  <span className="text-[7px] font-mono uppercase text-muted-foreground font-semibold">Closed</span>
                ) : isFull ? (
                  <span className="text-[7px] font-mono uppercase text-red-500/80 font-semibold">Full</span>
                ) : isLimited ? (
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-[6px] font-bold uppercase tracking-wider">
                    {day.slotsLeft} left
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-[6px] font-bold uppercase tracking-wider">
                    Slots
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Date Header */}
      {selectedDate && (
        <div className="space-y-4 pt-2 border-t border-border/30">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>2. Choose Fitting Hour Slot</span>
            </h4>
            <p className="text-[11px] font-semibold text-primary font-mono uppercase">
              Selected Session: {getSelectedDateLabel()}
            </p>
          </div>

          {/* Time Slots Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.time
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleTimeClick(slot.time)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all select-none hover:scale-[1.01] ${
                    isSelected
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10'
                      : 'bg-card/30 border-border/50 text-foreground hover:bg-card/75 hover:border-foreground/45'
                  }`}
                >
                  <span className="text-xs font-black font-mono tracking-tight">
                    {slot.time}
                  </span>
                  <span className={`text-[8px] uppercase tracking-widest font-mono mt-1 ${isSelected ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
                    {slot.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
