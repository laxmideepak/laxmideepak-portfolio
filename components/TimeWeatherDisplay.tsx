'use client'

import { useState, useEffect } from 'react'
import { Clock, Calendar, Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer } from 'lucide-react'

interface WeatherData {
  temperature: number
  condition: string
  icon: React.ReactNode
  humidity?: number
  windSpeed?: number
}

export function TimeWeatherDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState<WeatherData | null>(null)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Enhanced weather simulation with more realistic data
  useEffect(() => {
    const getWeatherIcon = (condition: string) => {
      switch (condition.toLowerCase()) {
        case 'sunny':
        case 'clear':
          return <Sun className="h-4 w-4 text-yellow-400" />
        case 'rainy':
        case 'rain':
          return <CloudRain className="h-4 w-4 text-blue-400" />
        case 'snowy':
        case 'snow':
          return <CloudSnow className="h-4 w-4 text-blue-300" />
        case 'windy':
        case 'wind':
          return <Wind className="h-4 w-4 text-gray-400" />
        case 'cloudy':
        case 'partly cloudy':
          return <Cloud className="h-4 w-4 text-gray-400" />
        default:
          return <Cloud className="h-4 w-4 text-gray-400" />
      }
    }

    // More realistic weather simulation
    const weatherConditions = [
      { name: 'Sunny', tempRange: [20, 35], icon: 'sunny' },
      { name: 'Partly Cloudy', tempRange: [15, 28], icon: 'cloudy' },
      { name: 'Cloudy', tempRange: [12, 25], icon: 'cloudy' },
      { name: 'Rainy', tempRange: [8, 20], icon: 'rainy' },
      { name: 'Clear', tempRange: [18, 32], icon: 'clear' }
    ]

    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
    const temperature = Math.floor(Math.random() * (randomCondition.tempRange[1] - randomCondition.tempRange[0])) + randomCondition.tempRange[0]

    const mockWeather: WeatherData = {
      temperature,
      condition: randomCondition.name,
      icon: getWeatherIcon(randomCondition.name),
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
    }

    setWeather(mockWeather)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="inline-block border border-white/20 rounded-md px-2 py-1 bg-black/10 backdrop-blur-sm">
      <div className="flex items-center space-x-1.5">
        {/* Time */}
        <span className="text-xs font-mono font-medium text-white">
          {formatTime(currentTime)}
        </span>
        
        {/* Day */}
        <span className="text-xs font-medium text-white/80">
          {formatDay(currentTime)}
        </span>
      </div>
    </div>
  )
}
