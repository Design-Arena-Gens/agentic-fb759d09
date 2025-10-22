'use client'

import { useState } from 'react'

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void
}

export default function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([
    {
      role: 'bot',
      content: 'Hi! I\'m your content curator assistant. Tell me what you\'re interested in, and I\'ll find great content for you!'
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setChatHistory(prev => [...prev, { role: 'user', content: message }])
    onSendMessage(message)

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'bot',
        content: `Great! I'm updating your feed with content about "${message}". Keep swiping to discover more!`
      }])
    }, 500)

    setMessage('')
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl h-[600px] flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <h3 className="text-2xl font-bold text-white">Chat with Curator Bot</h3>
        <p className="text-white/80 text-sm">Refine your preferences anytime</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me what interests you..."
            className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
