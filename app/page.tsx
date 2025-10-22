'use client'

import { useState, useEffect } from 'react'
import ContentCard from '@/components/ContentCard'
import ChatInterface from '@/components/ChatInterface'
import PreferenceSetup from '@/components/PreferenceSetup'

export default function Home() {
  const [preferences, setPreferences] = useState<string[]>([])
  const [contents, setContents] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showSetup, setShowSetup] = useState(true)
  const [savedCards, setSavedCards] = useState<any[]>([])
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (preferences.length > 0 && contents.length === 0) {
      fetchContent()
    }
  }, [preferences])

  useEffect(() => {
    if (currentIndex >= contents.length - 2 && contents.length > 0 && !loading) {
      fetchContent()
    }
  }, [currentIndex])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      })
      const data = await response.json()
      setContents(prev => [...prev, ...data.contents])
    } catch (error) {
      console.error('Error fetching content:', error)
    }
    setLoading(false)
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedCards(prev => [...prev, contents[currentIndex]])
    }
    setCurrentIndex(prev => prev + 1)
  }

  const handlePreferencesSubmit = (prefs: string[]) => {
    setPreferences(prefs)
    setShowSetup(false)
  }

  const handleChatMessage = async (message: string) => {
    const newPrefs = [...preferences, message]
    setPreferences(newPrefs)
    setContents([])
    setCurrentIndex(0)
  }

  if (showSetup) {
    return <PreferenceSetup onSubmit={handlePreferencesSubmit} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Content Curator</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="px-6 py-2 bg-accent text-gray-800 rounded-full font-semibold hover:shadow-lg transition"
            >
              {showSaved ? 'Discover' : `Saved (${savedCards.length})`}
            </button>
            <button
              onClick={() => setShowSetup(true)}
              className="px-6 py-2 bg-white text-gray-800 rounded-full font-semibold hover:shadow-lg transition"
            >
              Reset
            </button>
          </div>
        </div>

        {showSaved ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                {card.url && (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            ))}
            {savedCards.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                No saved cards yet. Swipe right on content you like!
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative h-[600px] flex items-center justify-center">
                {contents.length === 0 && loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Curating content for you...</p>
                  </div>
                ) : currentIndex < contents.length ? (
                  <ContentCard
                    content={contents[currentIndex]}
                    onSwipe={handleSwipe}
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600">Loading more content...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <ChatInterface onSendMessage={handleChatMessage} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
