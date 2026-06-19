import { useState } from "react"
import { DateRange } from "../subComponent/dateRange";
// import { Current } from "../subComponent/current";

function Button({icon, text, id, current, setCurrent}) {

    return (
        <button className="flex-1 flex items-center 
        justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium 
        transition-all duration-200" style={{
            background: current == id ? "rgba(255,255,255,0.15)": "transparent",
            color: current == id ? "white" : "rgba(255,255,255,0.45)",
            boxShadow: current == id ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            }}
            onClick={()=>setCurrent(id)}>
            <span>{icon}</span>
            <span className="hidden sm:inline">{text}</span>
        </button>
    )
}


export default function  Main() {
    const [current, setCurrent] = useState(0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex gap-1 p-1 rounded-2xl mb-6 " 
            style={{
                background:"rgba(255,255,255,0.06)", 
                border:"1px solid rgba(255,255,255,0.08)"}}
            >
                <Button 
                icon="🌤️" 
                text="Current" 
                id={0} 
                current={current} 
                setCurrent={setCurrent} />

                <Button 
                icon="📅" 
                text="Date Range" 
                id={1} 
                current={current} 
                setCurrent={setCurrent} />

                <Button 
                icon="💾" 
                text="Saved" 
                id={2} 
                current={current} 
                setCurrent={setCurrent} />

                <Button 
                icon="🗺️" 
                text="Map & Media" 
                id={3} 
                current={current} 
                setCurrent={setCurrent} />
            </div>
            {/* <Current /> */}
            <DateRange />
        </div>
    )
}