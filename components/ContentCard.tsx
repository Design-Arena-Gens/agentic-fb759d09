'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface ContentCardProps {
  content: {
    title: string
    description: string
    category: string
    tags?: string[]
    url?: string
    imageUrl?: string
  }
  onSwipe: (direction: 'left' | 'right') => void
}

export default function ContentCard({ content, onSwipe }: ContentCardProps) {
  const [exitX, setExitX] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 1000 : -1000)
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  const handleButtonClick = (direction: 'left' | 'right') => {
    setExitX(direction === 'right' ? 1000 : -1000)
    onSwipe(direction)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        className="absolute w-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        animate={{ x: exitX }}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {content.imageUrl && (
            <div className="h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="text-6xl">{content.imageUrl}</div>
            </div>
          )}

          <div className="p-8">
            <div className="mb-4">
              <span className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
                {content.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {content.title}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {content.description}
            </p>

            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {content.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {content.url && (
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline font-semibold"
              >
                Learn more →
              </a>
            )}
          </div>
        </div>

        <div className="absolute top-10 left-10 opacity-0 pointer-events-none"
          style={{
            opacity: useTransform(x, [-100, 0], [1, 0]).get()
          }}
        >
          <div className="text-6xl font-bold text-red-500 rotate-[-20deg] border-4 border-red-500 px-6 py-2 rounded-xl">
            PASS
          </div>
        </div>

        <div className="absolute top-10 right-10 opacity-0 pointer-events-none"
          style={{
            opacity: useTransform(x, [0, 100], [0, 1]).get()
          }}
        >
          <div className="text-6xl font-bold text-green-500 rotate-[20deg] border-4 border-green-500 px-6 py-2 rounded-xl">
            SAVE
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center gap-6 mt-[500px]">
        <button
          onClick={() => handleButtonClick('left')}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition text-3xl"
        >
          ✕
        </button>
        <button
          onClick={() => handleButtonClick('right')}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition text-3xl"
        >
          ♥
        </button>
      </div>
    </div>
  )
}
