import GlassCard from "../glassCard/glassCard";

const EXPORTS = [
    { fmt:"json", icon:"{ }", label:"JSON" },
    { fmt:"csv",  icon:"⊞",  label:"CSV" },
    { fmt:"xml",  icon:"</>", label:"XML" },
    { fmt:"md",   icon:"#",   label:"MD" },
];
  
export function Saved() {
    return (
        <div className="space-y-4">
            <GlassCard className="p-4 flex flex-wrap items-center gap-3">
                <span className=
                "text-white/60 text-xs font-semibold uppercase tracking-wider">
                    Export:</span>

                <div className="flex gap-2">
                    {EXPORTS.map(({fmt,icon,label})=>(
                        <button key={fmt} 
                            className="flex items-center gap-1.5 px-3 py-1.5 
                            rounded-xl text-xs font-semibold transition-all 
                            hover:scale-105 active:scale-95 border"
                            style={{
                                background:"rgba(255,255,255,0.08)", 
                                borderColor:"rgba(255,255,255,0.12)", 
                                color:"rgba(255,255,255,0.7)"
                                }}>
                            <span className="font-mono">{icon}</span>{label}
                        </button>
                    ))}
                </div>
            </GlassCard>

            <GlassCard className="py-20 text-center">
                <div className="text-5xl mb-4">🗃️</div>
                <p className="text-white/50 font-medium">No saved records</p>
                <p className="text-white/30 text-sm mt-1">Go to Date Range, fetch data, and save it.</p>
            </GlassCard>

        </div>
    )
}