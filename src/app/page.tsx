import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-game-primary to-game-secondary flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Laroverse</h1>
        <p className="text-xl text-white/90 mb-8">A collection of family games</p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">Available Games</h2>
          
          <Link 
            href="/werewolf" 
            className="block w-full bg-white text-game-primary font-semibold py-4 px-6 rounded-lg hover:bg-white/90 transition-colors mb-4"
          >
            🐺 One Night Werewolf
          </Link>
          
          <p className="text-white/70 text-sm">
            More games coming soon!
          </p>
        </div>
      </div>
    </main>
  )
}
