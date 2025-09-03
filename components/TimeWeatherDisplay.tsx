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
          return <Sun className="h-4 w-4 text-yellow-500" />
        case 'rainy':
        case 'rain':
          return <CloudRain className="h-4 w-4 text-blue-500" />
        case 'snowy':
        case 'snow':
          return <CloudSnow className="h-4 w-4 text-blue-300" />
        case 'windy':
        case 'wind':
          return <Wind className="h-4 w-4 text-gray-500" />
        case 'cloudy':
        case 'partly cloudy':
          return <Cloud className="h-4 w-4 text-gray-500" />
        default:
          return <Cloud className="h-4 w-4 text-gray-500" />
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
      hour12: false
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
    <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col space-y-3">
        {/* Time */}
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-lg font-mono font-semibold text-gray-800">
            {formatTime(currentTime)}
          </span>
        </div>
        
        {/* Day */}
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-gray-700">
            {formatDay(currentTime)}
          </span>
        </div>
        
        {/* Weather */}
        {weather && (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              {weather.icon}
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                <span className="text-lg font-semibold text-gray-800">
                  {weather.temperature}°C
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {weather.condition}
            </div>
            {weather.humidity && weather.windSpeed && (
              <div className="text-xs text-gray-500 space-y-1">
                <div>💧 {weather.humidity}% humidity</div>
                <div>💨 {weather.windSpeed} km/h wind</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
