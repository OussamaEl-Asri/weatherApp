import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";


// fetched from the data base
const QUICK = ["New York","London","Tokyo","Sydney","Dubai","Paris","Cairo","Mumbai"];

export function Current() {
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                
                {/* search Bar */}
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2
                    text-white/30 text-base">🔍</span>
                    <Input 
                    placeholder='City, ZIP, "Eiffel Tower", "48.85,2.35"…'
                    className="pl-11 rounded-2xl!"></Input>
                </div>

                {/* search button */}
                <button
                    className="
                    bg-white/20 hover:bg-white/30 active:scale-95text-white
                    border border-white/2 rounded-2xl px-5 py-2.5 text-sm
                    active:scale-95 text-white"
                
                > Search</button>

            </div>
            {/* latest searched */}
            <div className="flex gap-2 flex-wrap">
                {QUICK.map(c=>(
                <button 
                    key={c} 
                    className="text-xs px-3 py-1.5 rounded-xl border 
                        transition-all duration-150 hover:scale-105 active:scale-95"
                    style={{
                        borderColor:"rgba(255,255,255,0.12)", 
                        background:"rgba(255,255,255,0.07)", 
                        color:"rgba(255,255,255,0.6)"}}
                >
                    {c}
                </button>
                ))}
            </div>

            {/* display */}
            <GlassCard className="py-20 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-white/50 text-lg">Search for any location</p>
                <p className="text-white/30 text-sm mt-1">City · ZIP · Landmark · GPS coordinates</p>
            </GlassCard>
        </div>
    )
}