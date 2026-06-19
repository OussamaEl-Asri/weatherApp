

export default function Header() {
    return (
        <div className="text-center mb-2">
            <div>
                <p className="text-xs font-medium inline-flex 
                items-center gap-2 px-4 py-1.5 rounded-full border 
                border-white/10 mb-4 text-accent" >
                    Live Weather Dashboard
                </p>
            </div>
            
            <div className="text-4xl font-bold text-white mb-2 tracking-tight">
                <h1>🌍 Weather</h1>
            </div>
            
            <div className="text-white/50 text-sm">
                <p>Search any city, ZIP, or coordinates</p>
            </div>
        </div>
    )
}