import { useState, useEffect } from "react";
import GlassCard from "../glassCard/glassCard";
import {ErrorBanner} from "./errorBanner"

const EXPORTS = [
    { fmt:"json", icon:"{ }", label:"JSON" },
    { fmt:"csv",  icon:"⊞",  label:"CSV" },
    { fmt:"xml",  icon:"</>", label:"XML" },
    { fmt:"md",   icon:"#",   label:"MD" },
];
  
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

async function readDB(setSavedRecord, setIsLoading, setError) {

  try {
    setIsLoading(true);
    const response = await fetch("http://127.0.0.1:8000/readDataBase");
    const data = await response.json();
    if (response.ok && data.status_code == 200) {
      let records = data.message;

      if (!records || records?.length == 0)
        records = null
      setSavedRecord(records);
    }
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false);
  }
}

function LoadingDisplay() {
  return (
    <GlassCard className="py-20 text-center">
      <div className="text-5xl mb-4 animate-bounce">
        ⏳
      </div>

      <p className="text-white/70 font-medium">
        Loading records...
      </p>

      <p className="text-white/30 text-sm mt-1">
        Fetching saved weather data from the database.
      </p>
    </GlassCard>
  );
}


function startEdit(record, setEditingDate, setEditingValue) {
  setEditingDate(record.date);
  setEditingValue(record.condition.text);
}

async function saveCondition(date, 
  editingValue, 
  setEditingValue, 
  setEditingDate, 
  setSavedRecord,
  setError) {
  try {
    setError(null);
    const response = await fetch(
      "http://127.0.0.1:8000/updateCondition",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          condition_text: editingValue,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok || data.status_code != 201) {
      console.log(data)
      setError(data.error);
      return 
    }

    setSavedRecord(prev =>
      prev.map(record =>
        record.date === date
          ? {
              ...record,
              condition: {
                ...record.condition,
                text: editingValue,
              },
            }
          : record
      )
    );
    setEditingDate(null);
  } catch (err) {
    console.error(err);
  }
}

async function deleteRecord(date, setError, setSavedRecord) {
  try {
    setError(null);
    const response = await fetch(
      "http://127.0.0.1:8000/deleteRecord",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok || data.status_code != 201) {
      console.log(data)
      setError(data.error);
      return 
    }
    setSavedRecord(prev =>
      prev.filter(record => record.date !== date)
    );
  } catch {
    return 
  }
}

export function Saved() {
  const [savedRecord, setSavedRecord] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [editingDate, setEditingDate] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    readDB(setSavedRecord, setIsLoading, setError);
  }, []);

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
            {error && <ErrorBanner msg={error} onClose={()=>setError(null)}/> }
        
        {isLoading ?
            <LoadingDisplay />
          : savedRecord.length > 0 ?
          savedRecord.map((d) => (
            <div
              key={d.date}
              className="flex gap-4 items-start py-4 border-b border-white/10"
            >
              <div className="text-3xl pt-1">
                  <img
                    src={d.condition.icon}
                    alt={d.condition.text}
                    className="w-10 h-10"
                  />
              </div>
          
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-white font-semibold">
                    {d.date}
                  </span>
          
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(59,130,246,0.2)",
                      color: "#93c5fd",
                    }}
                  >
                    Avg {d.avg_temp}°C
                  </span>
          
        {
          editingDate === d.date ? (
          <input
            autoFocus
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveCondition(d.date, 
                  editingValue, 
                  setEditingValue, 
                  setEditingDate, 
                  setSavedRecord,
                  setError);
              }

              if (e.key === "Escape") {
                setEditingDate(null);
              }
            }}
            className="px-2 py-0.5 rounded bg-white/10 text-white text-xs border border-white/20 outline-none"
          />
        ) : (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(34,197,94,0.2)",
              color: "#86efac",
            }}
          >
            {d.condition.text}
          </span>
        )}
                </div>
          
                <p className="text-white/40 text-xs">
                  Min {d.min_temp}°C → Max {d.max_temp}°C
                </p>
              </div>
          
              <div className="flex gap-1.5 shrink-0">
                <Btn
                  onClick={() => startEdit(d, setEditingDate, setEditingValue)}
                  variant="ghost"
                  size="sm"
                >
                  ✏️
                </Btn>
          
                <Btn
                  onClick={() => deleteRecord(d.date, setError, setSavedRecord)}
                  variant="danger"
                  size="sm"
                >
                  🗑
                </Btn>
              </div>
            </div>
          )
          )
            :
              <GlassCard className="py-20 text-center">
                  <div className="text-5xl mb-4">🗃️</div>
                  <p className="text-white/50 font-medium">No saved records</p>
                  <p className="text-white/30 text-sm mt-1">Go to Date Range, fetch data, and save it.</p>
              </GlassCard>
}
        </div>
    )
}