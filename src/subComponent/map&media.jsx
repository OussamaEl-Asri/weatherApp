import { useState } from "react";
import GlassCard from "../glassCard/glassCard";
import Input from "../input/input";


async function searchVideo(location) {
    const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        location + " travel vlog"
      )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
    );
  
    const data = await response.json();
  
    return data?.items[0]?.id?.videoId;
}

async function handleSearch(ytInput, setVideoId) {
    const id = await searchVideo(ytInput);
    setVideoId(id);
}

export function MapAndMedia() {
    const [input, setInput] = useState("");
    const [location, setLocation] = useState("");

    const [ytInput, setYtInput] = useState("");
    const [videoId, setVideoId] = useState("");

    return (
        <div className="space-y-4">
            <GlassCard className="overflow-hidden">
                <div className="p-5 pb-4">
                    <h2 className="text-white font-semibold mb-1">🗺️ Google Maps</h2>
                    <p className="text-white/40 text-xs mb-3">
                        Auto-populated from weather search · or enter any location
                    </p>
                    
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Enter location…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button 
                            className="px-5 py-2.5 text-sm bg-white/20 hover:bg-white/30 
                            active:scale-95 text-white border border-white/20
                            font-semibold rounded-2xl transition-all duration-200 
                            flex items-center justify-center gap-2 disabled:opacity-40 
                            disabled:cursor-not-allowed"
                            onClick={() => setLocation(input)}>
                            Show
                        </button>
                    </div>

                </div>
                { location ?
                     <iframe
                     title="map"
                     width="100%"
                     height="500"
                     className="mt-4 rounded-2xl"
                     src={`https://maps.google.com/maps?q=${encodeURIComponent(
                       location
                     )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                   />
                :
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
                
                }
            </GlassCard>

            <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-400 text-lg">▶</span>
                    <h2 className="text-white font-semibold">
                        YouTube — Location Videos
                    </h2>
                </div>

                <div className="flex gap-2 mb-4">
                    <Input 
                        placeholder="Search location videos…"
                        value={ytInput}
                        onChange={(e) => setYtInput(e.target.value)}
                    />
                    <button 
                        className="px-5 py-2.5 text-sm bg-white/20 hover:bg-white/30 
                            active:scale-95 text-white border border-white/20
                            font-semibold rounded-2xl transition-all duration-200 
                            flex items-center justify-center gap-2 disabled:opacity-40 
                            disabled:cursor-not-allowed"
                        onClick={() => handleSearch(ytInput, setVideoId)}>
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
                {videoId && 
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video"
                        width="100%"
                        height="500"
                        allowFullScreen/>
                }
            </GlassCard>

        </div>
    )
}