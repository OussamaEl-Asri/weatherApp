import { useState } from "react";
import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";
import { ErrorBanner } from "./errorBanner";
import { fmtDate, parseLocation } from "./utils";
import { SuccessBanner } from "./successBanner"

async function fetchDateRangeWeather(query, setIsLoding, setError, setDrResult, setSuccess) {
    const location = parseLocation(query.city)

    setError(null)
    setSuccess(null)
    setDrResult(null);

    if (!location.city){ 
        setError("Enter location")
        setIsLoding(false)
        return ;
    }
    query.city = location.city;

    try {
        const response = await fetch("http://localhost:8000/weatherDateRange",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
            }
        );
        const data = await response.json();

        if (!response.ok) {
            setError(data.detail[0].msg)
            return 
        }
        if (data.status_code == 200) {
            console.log(data.message)
            setDrResult(data.message)
        }else {
            setError(data.error)
        }
    } catch (error) {
        setError(error)
    } finally {
        setIsLoding(false);
    }


}

async function saveRecords(query, setError, setSuccess){
    setError(null)
    setSuccess(null)

    try {
        const response = await fetch("http://localhost:8000/insert",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
                }
            )
        const data = await response.json()

        if (response.ok) {

            if (data.status_code == 201) {
                setSuccess("Successed to save to DataBase")
            } else {
                setError("Failed to save to DataBase")
            }

        } else {
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export function DateRange() {
    const [isLoding, setIsLoding] = useState(false);
    const [query, setQuery] = useState({"city": "", "start_date": "", "end_date": ""})
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [drResult, setDrResult] = useState(null);

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
                        <Input 
                            value={query.city}
                            onChange={(e) => setQuery((prev) => (
                                {...prev, city: e.target.value.trim(),}
                            ))}
                            placeholder='City, ZIP, landmark, or "lat,lon"'/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-white/50 text-xs mb-1.5 block 
                            font-medium uppercase tracking-wider">Start Date</label>
                            <Input 
                                type="date"
                                onChange={(e) => setQuery((prev) => (
                                    {...prev,start_date: e.target.value.trim(),}
                                ))}/>
                        </div>

                        <div>
                            <label className="text-white/50 text-xs mb-1.5 
                            block font-medium uppercase tracking-wider">End Date</label>
                            <Input 
                                type="date" 
                                onChange={(e) => setQuery((prev) => (
                                    {...prev,end_date: e.target.value.trim(),}
                                ))}/>
                        </div>
                    </div>
                </div>

                <button 
                    className="w-full justify-center bg-blue-500/30 
                    hover:bg-blue-500/50 active:scale-95 text-blue-100 border
                    border-blue-400/30 px-7 py-3.5 text-base font-semibold 
                    rounded-2xl transition-all duration-200 flex items-center 
                    gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => (
                        setIsLoding(true),
                        fetchDateRangeWeather(query, setIsLoding, setError, setDrResult, setSuccess)
                    )}
                    >
                    {isLoding ? 
                    <><span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> Fetching data…</>
                    : "🔍 Fetch Weather Data"}
                </button>

                <div 
                    className="mt-4 rounded-2xl p-3 grid grid-cols-1 gap-2" 
                    style={{background:"rgba(255,255,255,0.04)"}}>
                    {["✓ Location fuzzy-matched via WeatherAPI",
                    "✓ Range: today ±1yr back, 14 days forward",
                    "✓ Max 300-day range · Start < End required"].map(t=>(
                    <p key={t} className="text-white/30 text-xs">{t}</p>
                    ))}
                </div>
                {error && <div className="mt-3"><ErrorBanner msg={error} onClose={()=>setError(null)}/></div>}
                {success && <div className="mt-3"><SuccessBanner msg={success} onClose={()=>setSuccess(null)}/></div>}
            </GlassCard>

            {drResult && (
              <GlassCard className="p-6 fade-in">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-white font-bold text-lg">{fmtDate(drResult[0].date)}</h3>
                    <p className="text-white/50 text-sm">{query.start_date} → {query.end_date}</p>
                  </div>
                  <button 
                    className="font-semibold rounded-2xl transition-all duration-200 
                    flex items-center justify-center gap-2 disabled:opacity-40 
                    disabled:cursor-not-allowed bg-emerald-500/30 hover:bg-emerald-500/50 
                    active:scale-95 text-emerald-100 border px-5 py-2.5 text-sm
                    border-emerald-400/30"
                    onClick={() => (saveRecords(drResult, setError, setSuccess))}
                    >💾 Save to DB</button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-2xl p-4 text-center" style={{background:"rgba(255,255,255,0.07)"}}>
                    <p className="text-white/40 text-xs mb-1">AVG TEMP</p>
                    <p className="text-white text-3xl font-bold">{drResult[0].avg_temp}°C</p>
                  </div>
                  <div className="rounded-2xl p-4 text-center" style={{background:"rgba(255,255,255,0.07)"}}>
                    <p className="text-white/40 text-xs mb-1">CONDITION</p>
                    <p className="text-3xl mb-1"><img className="inline" src={drResult[0].condition.icon} /></p>
                    <p className="text-white text-xs">{drResult[0].condition.text}</p>
                  </div>
                  <div className="rounded-2xl p-4 text-center" style={{background:"rgba(255,255,255,0.07)"}}>
                    <p className="text-white/40 text-xs mb-1">SAMPLED</p>
                    <p className="text-white text-3xl font-bold">{drResult.length}</p>
                    <p className="text-white/40 text-xs">days</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{background:"rgba(255,255,255,0.06)"}}>
                        {["Date","","Max °C","Min °C","Avg °C"].map(h=><th key={h} className="text-left text-white/40 text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {drResult.map((d)=>(
                        <tr key={"d.date"} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 text-white/70 text-xs">{fmtDate(d.date)}</td>
                          <td className="px-2 py-3 text-xl"><img className="inline" src={d.condition.icon}/ ></td>
                          <td className="px-4 py-3 text-white font-semibold text-xs">{d.max_temp}°</td>
                          <td className="px-4 py-3 text-white/50 text-xs">{d.min_temp}°</td>
                          <td className="px-4 py-3 text-white/70 text-xs">{d.avg_temp}°</td>
                        </tr>
                    ))} 
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            )}
        </div>
    )
}