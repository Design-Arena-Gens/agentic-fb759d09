'use client'

import { useState } from 'react'

interface PreferenceSetupProps {
  onSubmit: (preferences: string[]) => void
}

const SUGGESTED_INTERESTS = [
  'Technology', 'Science', 'Art', 'Music', 'Sports',
  'Travel', 'Food', 'Fashion', 'Gaming', 'Books',
  'Movies', 'Fitness', 'Photography', 'Business', 'Health'
]

export default function PreferenceSetup({ onSubmit }: PreferenceSetupProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState('')

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()])
      setCustomInterest('')
    }
  }

  const handleSubmit = () => {
    if (selectedInterests.length > 0) {
      onSubmit(selectedInterests)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Content Curator
          </h1>
          <p className="text-xl text-gray-600">
            Discover content tailored to your interests
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            What are you interested in?
          </h2>
          <p className="text-gray-600 mb-6">
            Select at least 3 topics to get started, or add your own
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {SUGGESTED_INTERESTS.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  selectedInterests.includes(interest)
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
              placeholder="Add custom interest..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none"
            />
            <button
              onClick={addCustomInterest}
              className="px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition"
            >
              Add
            </button>
          </div>

          {selectedInterests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Your interests ({selectedInterests.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => toggleInterest(interest)}
                      className="hover:text-primary/70"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`w-full py-4 rounded-full font-bold text-xl transition ${
            selectedInterests.length > 0
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Discovering Content
        </button>
      </div>
    </div>
  )
}
