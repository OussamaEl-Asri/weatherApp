import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";


export function MapAndMedia() {
    return (
        <div className="space-y-4">
            <GlassCard className="overflow-hidden">
                <div className="p-5 pb-4">
                    <h2 className="text-white font-semibold mb-1">🗺️ Google Maps</h2>
                    <p className="text-white/40 text-xs mb-3">
                        Auto-populated from weather search · or enter any location
                    </p>
                    
                    <div className="flex gap-2">
                        <Input placeholder="Enter location…"/>
                        <button className="px-5 py-2.5 text-sm bg-white/20 hover:bg-white/30 
                        active:scale-95 text-white border border-white/20
                        font-semibold rounded-2xl transition-all duration-200 
                        flex items-center justify-center gap-2 disabled:opacity-40 
                        disabled:cursor-not-allowed">
                            Show
                        </button>
                    </div>

                </div>

                <div className="mx-5 mb-5 rounded-2xl h-48 flex 
                    items-center justify-center border border-white/10"
                    style={{background:"rgba(255,255,255,0.04)"}}>
                    <div className="text-center text-white/25">
                        <div className="text-4xl mb-2">🗺️</div>
                        <p className="text-sm">
                            Search a location to show the map
                        </p>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-400 text-lg">▶</span>
                    <h2 className="text-white font-semibold">
                        YouTube — Location Videos
                    </h2>
                </div>

                <p className="text-white/30 text-xs mb-4"> In production, calls
                    <code className="bg-white/10 px-1 rounded">
                        POST /api/youtube/search
                    </code> (key server-side)
                </p>

                <div className="flex gap-2 mb-4">
                    <Input placeholder="Search location videos…"/>
                    <button className="px-5 py-2.5 text-sm bg-white/20 hover:bg-white/30 
                        active:scale-95 text-white border border-white/20
                        font-semibold rounded-2xl transition-all duration-200 
                        flex items-center justify-center gap-2 disabled:opacity-40 
                        disabled:cursor-not-allowed">
                        Search
                    </button>
                </div>

                <div 
                className="rounded-2xl p-4 text-center border border-white/10" 
                style={{background:"rgba(255,255,255,0.04)"}}>
                  <span className="text-white/20 text-sm">
                    Enter a location to find videos
                  </span>
                </div>
            </GlassCard>

        </div>
    )
}