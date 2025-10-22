import { NextRequest, NextResponse } from 'next/server'

const contentDatabase = {
  Technology: [
    { title: 'The Future of Quantum Computing', description: 'Explore how quantum computers are revolutionizing data processing and cryptography, opening new frontiers in scientific research.', tags: ['quantum', 'computing', 'future'], url: 'https://example.com/quantum' },
    { title: 'AI Ethics in 2025', description: 'A deep dive into the ethical considerations and regulations shaping artificial intelligence development worldwide.', tags: ['AI', 'ethics', 'regulation'], url: 'https://example.com/ai-ethics' },
    { title: 'Web3 Revolution', description: 'Understanding decentralized applications and how blockchain technology is transforming the internet.', tags: ['web3', 'blockchain', 'crypto'], url: 'https://example.com/web3' },
  ],
  Science: [
    { title: 'CRISPR Gene Editing Breakthrough', description: 'Scientists achieve major milestone in genetic disease treatment using revolutionary CRISPR technology.', tags: ['genetics', 'medicine', 'research'], url: 'https://example.com/crispr' },
    { title: 'Climate Change Solutions', description: 'Innovative technologies and policies being implemented globally to combat climate change.', tags: ['climate', 'environment', 'sustainability'], url: 'https://example.com/climate' },
    { title: 'Space Exploration Update', description: 'Latest discoveries from Mars missions and plans for lunar colonization in the next decade.', tags: ['space', 'mars', 'exploration'], url: 'https://example.com/space' },
  ],
  Art: [
    { title: 'Digital Art Renaissance', description: 'How NFTs and digital galleries are transforming the art world and creating new opportunities for artists.', tags: ['digital', 'NFT', 'creativity'], url: 'https://example.com/digital-art' },
    { title: 'Street Art Movement', description: 'The evolution of street art from vandalism to recognized cultural expression in major cities.', tags: ['street', 'culture', 'urban'], url: 'https://example.com/street-art' },
    { title: 'AI-Generated Art Debate', description: 'Exploring the controversy and creativity behind AI art generators and their impact on traditional artists.', tags: ['AI', 'debate', 'creativity'], url: 'https://example.com/ai-art' },
  ],
  Music: [
    { title: 'Evolution of Electronic Music', description: 'Tracing the journey of electronic music from underground raves to mainstream festivals.', tags: ['electronic', 'EDM', 'festivals'], url: 'https://example.com/electronic' },
    { title: 'Streaming Era Impact', description: 'How streaming platforms have changed music consumption and artist compensation.', tags: ['streaming', 'industry', 'artists'], url: 'https://example.com/streaming' },
    { title: 'Vinyl Revival', description: 'Why physical music formats are making a comeback in the digital age.', tags: ['vinyl', 'nostalgia', 'collectors'], url: 'https://example.com/vinyl' },
  ],
  Sports: [
    { title: 'Sports Analytics Revolution', description: 'How data science is transforming coaching strategies and player performance.', tags: ['analytics', 'data', 'performance'], url: 'https://example.com/sports-analytics' },
    { title: 'Esports Growth', description: 'The rapid rise of competitive gaming as a legitimate sport with massive global audiences.', tags: ['esports', 'gaming', 'competitive'], url: 'https://example.com/esports' },
    { title: 'Athlete Mental Health', description: 'Breaking the stigma: How professional athletes are prioritizing mental wellness.', tags: ['mental-health', 'wellness', 'athletes'], url: 'https://example.com/athlete-health' },
  ],
  Travel: [
    { title: 'Sustainable Tourism', description: 'Eco-friendly travel destinations and practices that minimize environmental impact.', tags: ['eco', 'sustainable', 'green'], url: 'https://example.com/sustainable-travel' },
    { title: 'Digital Nomad Hotspots', description: 'Top cities around the world for remote workers seeking adventure and community.', tags: ['remote', 'nomad', 'lifestyle'], url: 'https://example.com/nomad' },
    { title: 'Hidden Gems of Europe', description: 'Undiscovered European destinations that offer authentic cultural experiences.', tags: ['europe', 'culture', 'authentic'], url: 'https://example.com/europe' },
  ],
  Food: [
    { title: 'Plant-Based Cuisine Innovation', description: 'Chefs creating incredible plant-based dishes that rival traditional meat dishes.', tags: ['vegan', 'plant-based', 'cuisine'], url: 'https://example.com/plant-based' },
    { title: 'Fermentation Renaissance', description: 'The ancient art of fermentation is making a comeback in modern kitchens worldwide.', tags: ['fermentation', 'probiotics', 'health'], url: 'https://example.com/fermentation' },
    { title: 'Food Waste Solutions', description: 'Innovative approaches to reducing food waste and feeding more people sustainably.', tags: ['sustainability', 'waste', 'innovation'], url: 'https://example.com/food-waste' },
  ],
  Fashion: [
    { title: 'Sustainable Fashion Movement', description: 'How eco-conscious brands are revolutionizing the fashion industry with ethical practices.', tags: ['sustainable', 'ethical', 'eco'], url: 'https://example.com/sustainable-fashion' },
    { title: 'Digital Fashion Shows', description: 'Virtual reality and livestreaming are transforming how we experience fashion weeks.', tags: ['digital', 'VR', 'innovation'], url: 'https://example.com/digital-fashion' },
    { title: 'Vintage Fashion Trend', description: 'Why millennials and Gen Z are embracing secondhand and vintage clothing.', tags: ['vintage', 'secondhand', 'trend'], url: 'https://example.com/vintage' },
  ],
  Gaming: [
    { title: 'Cloud Gaming Future', description: 'How streaming technology is making high-end gaming accessible without expensive hardware.', tags: ['cloud', 'streaming', 'accessibility'], url: 'https://example.com/cloud-gaming' },
    { title: 'Indie Game Renaissance', description: 'Small studios creating innovative games that challenge AAA industry standards.', tags: ['indie', 'innovation', 'creativity'], url: 'https://example.com/indie-games' },
    { title: 'Virtual Reality Gaming', description: 'The latest VR headsets and immersive experiences that blur reality and gaming.', tags: ['VR', 'immersive', 'future'], url: 'https://example.com/vr-gaming' },
  ],
  Books: [
    { title: 'Rise of Audio Books', description: 'How audiobooks are making literature more accessible and popular than ever.', tags: ['audio', 'accessibility', 'trend'], url: 'https://example.com/audiobooks' },
    { title: 'Self-Publishing Revolution', description: 'Authors finding success outside traditional publishing with direct-to-reader models.', tags: ['self-publishing', 'authors', 'indie'], url: 'https://example.com/self-publishing' },
    { title: 'Literary Fiction Comeback', description: 'Why serious literature is experiencing renewed interest among young readers.', tags: ['literary', 'fiction', 'literature'], url: 'https://example.com/literary' },
  ],
  Movies: [
    { title: 'Streaming Wars Impact', description: 'How competing streaming platforms are changing film production and distribution.', tags: ['streaming', 'industry', 'cinema'], url: 'https://example.com/streaming-wars' },
    { title: 'International Cinema Rise', description: 'Non-English films gaining mainstream recognition and breaking cultural barriers.', tags: ['international', 'diversity', 'culture'], url: 'https://example.com/international-cinema' },
    { title: 'The Future of Theaters', description: 'How cinema experiences are evolving to compete with home streaming.', tags: ['theaters', 'experience', 'innovation'], url: 'https://example.com/theaters' },
  ],
  Fitness: [
    { title: 'Home Workout Revolution', description: 'High-tech fitness equipment and apps bringing gym-quality workouts home.', tags: ['home', 'workout', 'tech'], url: 'https://example.com/home-fitness' },
    { title: 'Functional Fitness Trend', description: 'Moving beyond aesthetics to training for real-world movement and longevity.', tags: ['functional', 'movement', 'health'], url: 'https://example.com/functional' },
    { title: 'Recovery Science', description: 'New research on rest, recovery, and their crucial role in fitness progress.', tags: ['recovery', 'science', 'wellness'], url: 'https://example.com/recovery' },
  ],
  Photography: [
    { title: 'Smartphone Photography Era', description: 'How mobile cameras are rivaling professional equipment with computational photography.', tags: ['mobile', 'computational', 'tech'], url: 'https://example.com/smartphone-photo' },
    { title: 'Film Photography Revival', description: 'Young photographers rediscovering the art and patience of analog film.', tags: ['film', 'analog', 'revival'], url: 'https://example.com/film-photo' },
    { title: 'Drone Photography Guide', description: 'Capturing stunning aerial perspectives with consumer-friendly drone technology.', tags: ['drone', 'aerial', 'innovation'], url: 'https://example.com/drone' },
  ],
  Business: [
    { title: 'Remote Work Evolution', description: 'How distributed teams are reshaping corporate culture and productivity.', tags: ['remote', 'culture', 'productivity'], url: 'https://example.com/remote-work' },
    { title: 'Startup Funding Landscape', description: 'New models of venture capital and crowdfunding democratizing entrepreneurship.', tags: ['startup', 'funding', 'VC'], url: 'https://example.com/startup-funding' },
    { title: 'Four-Day Work Week', description: 'Companies experimenting with shorter work weeks and reporting better results.', tags: ['work-life', 'productivity', 'innovation'], url: 'https://example.com/four-day' },
  ],
  Health: [
    { title: 'Gut Health Science', description: 'Understanding the microbiome and its impact on overall health and wellness.', tags: ['microbiome', 'gut', 'wellness'], url: 'https://example.com/gut-health' },
    { title: 'Mental Health Apps', description: 'Digital tools making therapy and mental wellness support more accessible.', tags: ['mental', 'apps', 'accessibility'], url: 'https://example.com/mental-apps' },
    { title: 'Sleep Optimization', description: 'Science-backed strategies for improving sleep quality and daytime energy.', tags: ['sleep', 'optimization', 'energy'], url: 'https://example.com/sleep' },
  ],
}

function generateContent(preferences: string[]) {
  const contents: any[] = []

  preferences.forEach(pref => {
    const category = Object.keys(contentDatabase).find(
      cat => cat.toLowerCase() === pref.toLowerCase()
    )

    if (category && contentDatabase[category as keyof typeof contentDatabase]) {
      const categoryContents = contentDatabase[category as keyof typeof contentDatabase]
      contents.push(...categoryContents.map(c => ({ ...c, category })))
    } else {
      // Generate dynamic content for custom preferences
      const dynamicContent = [
        {
          title: `Exploring ${pref}`,
          description: `Discover the latest trends, insights, and innovations in the world of ${pref}. Stay ahead with curated content.`,
          category: pref,
          tags: [pref.toLowerCase(), 'trending', 'insights'],
          url: `https://example.com/${pref.toLowerCase().replace(/\s+/g, '-')}`,
        },
        {
          title: `${pref} for Beginners`,
          description: `A comprehensive guide to getting started with ${pref}. Perfect for newcomers looking to dive deep.`,
          category: pref,
          tags: [pref.toLowerCase(), 'beginner', 'guide'],
          url: `https://example.com/${pref.toLowerCase().replace(/\s+/g, '-')}-guide`,
        },
        {
          title: `Advanced ${pref} Techniques`,
          description: `Take your ${pref} knowledge to the next level with these expert tips and advanced strategies.`,
          category: pref,
          tags: [pref.toLowerCase(), 'advanced', 'expert'],
          url: `https://example.com/${pref.toLowerCase().replace(/\s+/g, '-')}-advanced`,
        },
      ]
      contents.push(...dynamicContent)
    }
  })

  // Shuffle and return 10 random items
  const shuffled = contents.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 10)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { preferences } = body

    if (!preferences || !Array.isArray(preferences) || preferences.length === 0) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      )
    }

    const contents = generateContent(preferences)

    return NextResponse.json({ contents })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
