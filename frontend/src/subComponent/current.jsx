import { useState } from "react";
import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";
import { ErrorBanner } from "./errorBanner";
import { SkeletonCard } from "./skeletonCard";
import { fmtDate, parseLocation } from "./utils";


async function fetchCurrentWeather(query, setData, setIsLoding, setError) {
    const location = parseLocation(query)
    setData(null)
    setError(null)

    if (!location.city) {
        setError("Enter location");
        setIsLoding(false);
        return ;
    }

    try {
        const response = await fetch(
            "http://localhost:8000/currentWeather",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
            }
        );

        const data = await response.json()

        if (!response.ok) {
            setError(data.detail[0].msg)
            return 
        }

        if (data.status_code == 200) {
            setData(data.message)
        } else {
            setError(data.error)
        }
    } catch(error) {
        setError(error)
    } finally {
        setIsLoding(false)
    }
 
}

export function Current() {
    const [isLoding, setIsLoding] = useState(false)
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [quick, setQuick] = useState([])

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                
                {/* search Bar */}
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2
                    text-white/30 text-base">🔍</span>
                    <Input 
                    placeholder='City, ZIP, "48.85,2.35"…'
                    className="pl-11 rounded-2xl!"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ></Input>
                </div>

                {/* search button */}
                <button
                    className="
                    bg-white/20 hover:bg-white/30 active:scale-95text-white
                    border border-white/2 rounded-2xl px-5 py-2.5 text-sm
                    active:scale-95 text-white"
                    onClick={() => (setIsLoding(true), 
                        setQuick(
                            (prev) => 
                            prev.includes(query) ? prev : [...prev, query]
                        ),
                        fetchCurrentWeather(query, setData, setIsLoding, setError))}
                
                >{isLoding ? <span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> : "Search"}</button>

            </div>
            {/* latest searched */}
            <div className="flex gap-2 flex-wrap">
                {quick.map(c=>(
                <button 
                    // key={c} 
                    className="text-xs px-3 py-1.5 rounded-xl border 
                        transition-all duration-150 hover:scale-105 active:scale-95"
                    style={{
                        borderColor:"rgba(255,255,255,0.12)", 
                        background:"rgba(255,255,255,0.07)", 
                        color:"rgba(255,255,255,0.6)"}}
                    onClick={() => (setQuery(c))}
                >
                    {c}
                </button>
                ))}
            </div>

            {/* display */}     
            {
            error && <ErrorBanner msg={error} onClose={()=>setError(null)}/> }
            {data ?
            <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1" style={{background:"rgba(255,255,255,0.1)"}}/>
                    <span className="text-white/40 text-xs font-semibold uppercase tracking-widest px-3">5-Day Forecast</span>
                    <div className="h-px flex-1" style={{background:"rgba(255,255,255,0.1)"}}/>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {data?.map((day,i)=>(
                      <GlassCard key={day.date} className={`p-3 text-center transition-all hover:scale-105 ${i===0?"ring-1 ring-white/20":""}`}>
                        <p className="text-white/50 text-xs mb-2">{i===0?"Today":fmtDate(day.date).split(",")[0]}</p>
                        <div className="text-3xl mb-2">{day.avg_temp}<img className="ml-10" src={day.condition.icon}/></div>
                        <div className="text-white font-bold text-sm">{Math.round(day.max_temp)}°</div>
                        <div className="text-white/40 text-xs">{Math.round(day.min_temp)}°</div>
                      </GlassCard>
                    ))}
                  </div>
            </div>
            : isLoding ?
                <SkeletonCard />
            : <GlassCard className="py-20 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-white/50 text-lg">Search for any location</p>
                <p className="text-white/30 text-sm mt-1">City · ZIP  · GPS coordinates</p>
            </GlassCard> 
        }
        </div>
    )
}