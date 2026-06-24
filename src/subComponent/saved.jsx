import GlassCard from "../glassCard/glassCard";

const EXPORTS = [
    { fmt:"json", icon:"{ }", label:"JSON" },
    { fmt:"csv",  icon:"⊞",  label:"CSV" },
    { fmt:"xml",  icon:"</>", label:"XML" },
    { fmt:"md",   icon:"#",   label:"MD" },
];


function Input({ className="", ...props }) {
    return (
      <input {...props}
        className={`w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition ${className}`} />
    );
  }
  
function Btn({ children, onClick, disabled, variant="primary", size="md", className="" }) {
    const base = "font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed";
    const sizes = { sm:"px-3 py-1.5 text-xs", md:"px-5 py-2.5 text-sm", lg:"px-7 py-3.5 text-base" };
    const variants = {
      primary: "bg-white/20 hover:bg-white/30 active:scale-95 text-white border border-white/20",
      success: "bg-emerald-500/30 hover:bg-emerald-500/50 active:scale-95 text-emerald-100 border border-emerald-400/30",
      danger:  "bg-red-500/20 hover:bg-red-500/40 active:scale-95 text-red-200 border border-red-400/20",
      ghost:   "hover:bg-white/10 active:scale-95 text-white/60 hover:text-white",
      accent:  "bg-blue-500/30 hover:bg-blue-500/50 active:scale-95 text-blue-100 border border-blue-400/30",
    };
    return <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>{children}</button>;
  }

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
            {/* <div>
                      <label className="text-white/40 text-xs mb-1 block">Notes</label>
                      <Input value={""} onChange={"e=>setEditNotes(e.target.value)"} placeholder="Add a note…"/>
                    </div> */}
                    {/* <div className="flex gap-2 pt-1">
                      <Btn onClick={"submitEdit"} variant="success" size="sm">Save Changes</Btn>
                      <Btn onClick={"()=>setEditId(null)"} variant="ghost" size="sm">Cancel</Btn>
                    </div> */}

<div className="flex gap-4 items-start">
                    <div className="text-3xl pt-1">{"wi(r.days?.[0]?.code||1000)"}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white font-semibold">{"r.resolvedName||r.location"}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)"}}>#{"r.id"}</span>
                        {/* {r.avgTempC!=null&&<span className="text-xs px-2 py-0.5 rounded-full" style={{background:"rgba(59,130,246,0.2)", color:"#93c5fd"}}>~{"r.avgTempC"}°C</span>} */}
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{background:"rgba(59,130,246,0.2)", color:"#93c5fd"}}>~{"r.avgTempC"}°C</span>
                      </div>
                      <p className="text-white/40 text-xs">{"r.startDate"} → {"r.endDate"}</p>
                      {/* {r.notes&&<p className="text-white/50 text-xs mt-1.5 italic">"{"r.notes"}"</p>} */}
                      <p className="text-white/50 text-xs mt-1.5 italic">"{"r.notes"}"</p>
                      <p className="text-white/25 text-xs mt-1">Saved {"new Date(r.savedAt).toLocaleDateString(\"en-US\",{month:\"short\",day:\"numeric\",year:\"numeric\"})"}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Btn onClick={"()=>startEdit(r)"} variant="ghost" size="sm">✏️</Btn>
                      <Btn onClick={"()=>deleteRecord(r.id)"} variant="danger" size="sm">🗑</Btn>
                    </div>
                  </div>
            <GlassCard className="py-20 text-center">
                <div className="text-5xl mb-4">🗃️</div>
                <p className="text-white/50 font-medium">No saved records</p>
                <p className="text-white/30 text-sm mt-1">Go to Date Range, fetch data, and save it.</p>
            </GlassCard>

        </div>
    )
}