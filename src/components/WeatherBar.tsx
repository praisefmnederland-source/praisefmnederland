import React, { useEffect, useState } from 'react'

interface ForecastItem {
  day: string
  temp: string
  condition: string
}

export default function WeatherBar() {
  const [forecast, setForecast] = useState<ForecastItem[]>([
    { day: 'Vandaag', temp: '--°C', condition: 'Laden...' },
    { day: 'Morgen', temp: '--°C', condition: 'Laden...' },
    { day: 'Volgende', temp: '--°C', condition: 'Laden...' }
  ])

  const API_KEY = '46c6e2c5797e2e465e06600d29810afe'
  const LAT = '52.3676'
  const LON = '4.9041'

  const translateCondition = (condition: string) => {
    const conditions: Record<string, string> = {
      Clear: 'Helder',
      Clouds: 'Bewolkt',
      Rain: 'Regen',
      Drizzle: 'Motregen',
      Thunderstorm: 'Onweer',
      Mist: 'Nevel',
      Fog: 'Mist',
      Haze: 'Nevel',
      Smoke: 'Rook',
      Dust: 'Stof',
      Sand: 'Zand',
      Ash: 'As',
      Squall: 'Windvlagen',
      Tornado: 'Tornado',
      Snow: 'Sneeuw'
    }
    return conditions[condition] || condition
  }

  useEffect(() => {
    const baseUrl = 'https://' + 'api.openweathermap.org/data/2.5/forecast'
    const url =
      baseUrl +
      '?lat=' + encodeURIComponent(LAT) +
      '&lon=' + encodeURIComponent(LON) +
      '&units=metric' +
      '&appid=' + encodeURIComponent(API_KEY)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Kan weersverwachting niet laden')
        return res.json()
      })
      .then((data) => {
        if (data && data.list && data.list.length > 0) {
          const todayData = data.list[0]
          const tomorrowData = data.list[8] || data.list[1]
          const nextDayData = data.list[16] || data.list[2]

          const daysOfWeek = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
          const localDateString = new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Amsterdam'
          })
          const localDate = new Date(localDateString)
          const todayIndex = localDate.getDay()
          const formatDayName = (offset: number) =>
            daysOfWeek[(todayIndex + offset) % 7]

          setForecast([
            {
              day: 'Vandaag',
              temp: Math.round(todayData.main.temp) + '°C',
              condition: translateCondition(todayData.weather[0].main)
            },
            {
              day: 'Morgen',
              temp: Math.round(tomorrowData.main.temp) + '°C',
              condition: translateCondition(tomorrowData.weather[0].main)
            },
            {
              day: formatDayName(2),
              temp: Math.round(nextDayData.main.temp) + '°C',
              condition: translateCondition(nextDayData.weather[0].main)
            }
          ])
        }
      })
      .catch(() => {
        setForecast([
          { day: 'Vandaag', temp: '--°C', condition: 'Niet beschikbaar' },
          { day: 'Morgen', temp: '--°C', condition: 'Niet beschikbaar' },
          { day: 'Volgende', temp: '--°C', condition: 'Niet beschikbaar' }
        ])
      })
  }, [])

  return (
    <div className="py-6 border-b border-gray-300 dark:border-white/10">
      <div className="bg-gray-100 dark:bg-[#1A1A1A] p-4 transition-colors rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#121212] shadow-sm flex items-center justify-center text-orange-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h10a4 4 0 001.5-7.7A5 5 0 008.5 7.3 4.5 4.5 0 003 15z"
                />
              </svg>
            </div>

            <div>
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wide">
                Amsterdam, NL
              </p>
              <h3 className="text-sm font-bold leading-tight text-gray-900 dark:text-white">
                Weersverwachting
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 dark:bg-[#121212]/60 px-3 py-2 rounded-xl text-center flex flex-col items-center justify-center min-w-[85px]"
            >
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                {item.day}
              </span>
              <span className="text-sm font-black text-gray-950 dark:text-white my-0.5">
                {item.temp}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-full">
                {item.condition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
