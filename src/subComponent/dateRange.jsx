import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";

export function DateRange() {
    return (
        <div className="space-y-4">
            <GlassCard className="p-6">
                <h2 className="text-white font-semibold text-lg mb-1">
                    📅 Historical Weather by Date Range
                </h2>
                <p className="text-white/40 text-sm mb-5">
                    Query temperature data for any location and time window. 
                    Save results to the database.
                </p>

                <div className="space-y-3 mb-5">
                    <div>
                        <label className="text-white/50 text-xs mb-1.5 block 
                        font-medium uppercase tracking-wider">Location</label>
                        <Input   placeholder='City, ZIP, landmark, or "lat,lon"'/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-white/50 text-xs mb-1.5 block 
                            font-medium uppercase tracking-wider">Start Date</label>
                            <Input type="date"  max={""}/>
                        </div>

                        <div>
                            <label className="text-white/50 text-xs mb-1.5 
                            block font-medium uppercase tracking-wider">End Date</label>
                            <Input type="date" onChange={""} max={""}/>
                        </div>
                    </div>
                </div>

                <button className="w-full justify-center bg-blue-500/30 
                    hover:bg-blue-500/50 active:scale-95 text-blue-100 border
                    border-blue-400/30 px-7 py-3.5 text-base font-semibold 
                    rounded-2xl transition-all duration-200 flex items-center 
                    gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                    🔍 Fetch Weather Data
                </button>

                <div 
                    className="mt-4 rounded-2xl p-3 grid grid-cols-1  gap-2" 
                    style={{background:"rgba(255,255,255,0.04)"}}>
                    {["✓ Location fuzzy-matched via WeatherAPI",
                    "✓ Range: today ±1yr back, 14 days forward",
                    "✓ Max 300-day range · Start < End required"].map(t=>(
                    <p key={t} className="text-white/30 text-xs">{t}</p>
                    ))}
                </div>

            </GlassCard>
        </div>
    )
}