export function SuccessBanner({ msg, onClose }) {
    return (
      <div
        className="flex gap-3 items-start rounded-2xl px-5 py-4 border animate-pulse-once"
        style={{
          background: "rgba(34,197,94,0.15)",
          borderColor: "rgba(34,197,94,0.3)",
        }}
      >
        <span className="text-2xl mt-0.5">✅</span>
  
        <div className="flex-1">
          <p className="text-green-200 font-semibold text-sm">Success</p>
          <p className="text-green-300/80 text-xs mt-0.5 leading-relaxed">
            {msg}
          </p>
        </div>
  
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-300/60 hover:text-green-200 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>
    );
  }