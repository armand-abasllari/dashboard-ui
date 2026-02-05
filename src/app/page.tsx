export default function Home() {
  return (
    <main className="min-h-screen px-8 py-12 bg-gradient-to-b from-[#0b1220] to-black text-white">
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Live stats powered by Trakt + Steam (more coming).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {/* Trakt */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            🎬 Trakt
          </h2>
          <p className="text-gray-400 text-sm">
            Coming next: recently watched + ratings.
          </p>
        </div>

        {/* Steam */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            🎮 Steam
          </h2>
          <p className="text-gray-400 text-sm">
            Coming next: top played + completion stats.
          </p>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            ⚙️ Status
          </h2>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Frontend: Cloudflare Pages ✅</li>
            <li>• APIs: not connected yet</li>
            <li>• Next: create /api endpoints</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
