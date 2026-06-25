export function ErrorBanner({ msg, onClose }) {
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