import { useState } from "react";
import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";


// fetched from the data base
const QUICK = ["New York","London","Tokyo","Sydney","Dubai","Paris","Cairo","Mumbai"];


function fmtDate(s) { return new Date(s+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}); }

function parseLocation(query) {
    const value = query.trim();
  
    // Latitude,Longitude
    const coordsMatch = value.match(
       /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/
    );

    if (coordsMatch) {
      return {
        lat_long: [
          parseFloat(coordsMatch[1]),
          parseFloat(coordsMatch[2]),
        ],
      };
    }

    // ZIP code (digits only)
    if (/^\d+$/.test(value)) {
      return {
        zip_code: parseInt(value, 10),
      };
    }

    // Otherwise treat as city
    return {
      city: value,
    };
  }


async function fetchCurrentWeather(query, setData, setIsLoding, setError) {
    const location = parseLocation(query)
    setData(null)
    setError(null)

    if (!location.city) {
        setError("Enter location");
        setIsLoding(false);
        return ;
    }
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

    if (data.status_code == 200) {
        setData(data.message)
    } else {
        setError(data.error)
    }
 
    setIsLoding(false)
}

function ErrorBanner({ msg, onClose }) {
    return (
      <div className="flex gap-3 items-start rounded-2xl px-5 py-4 border animate-pulse-once"
        style={{ background:"rgba(239,68,68,0.15)", borderColor:"rgba(239,68,68,0.3)" }}>
        <span className="text-2xl mt-0.5">⚠️</span>
        <div className="flex-1">
          <p className="text-red-200 font-semibold text-sm">Error</p>
          <p className="text-red-300/80 text-xs mt-0.5 leading-relaxed">{msg}</p>
        </div>
        {onClose && <button onClick={onClose} className="text-red-300/60 hover:text-red-200 text-xl leading-none">×</button>}
      </div>
    );
}

function SkeletonCard() {
    return (
      <div className="rounded-3xl border border-white/10 p-6 animate-pulse" style={{ background:"rgba(255,255,255,0.06)" }}>
        <div className="h-4 bg-white/10 rounded-full w-1/3 mb-4"/>
        <div className="h-16 bg-white/10 rounded-2xl mb-4"/>
        <div className="grid grid-cols-4 gap-2">
          {[0,1,2,3].map(i=><div key={i} className="h-16 bg-white/10 rounded-xl"/>)}
        </div>
      </div>
    );
  }

export function Current() {
    const [isLoding, setIsLoding] = useState(false)
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

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
                        fetchCurrentWeather(query, setData, setIsLoding, setError))}
                
                >{isLoding ? <span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> : "Search"}</button>

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
                        <div className="text-3xl mb-2">{day.avg_temp}</div>
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