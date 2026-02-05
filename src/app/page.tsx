export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-slate-100 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
        <p className="text-slate-400 mb-10">
          Live stats powered by Trakt + Steam (more coming).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trakt */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              🎬 Trakt
            </h2>
            <p className="text-slate-400">
              Coming next: recently watched + ratings.
            </p>
          </div>

          {/* Steam */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              🎮 Steam
            </h2>
            <p className="text-slate-400">
              Coming next: top played + completion stats.
            </p>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ⚙️ Status
            </h2>
            <ul className="text-slate-400 space-y-1">
              <li>• Frontend: Cloudflare Pages ✅</li>
              <li>• APIs: not connected yet</li>
              <li>• Next: create /api endpoints</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
