
export default function GlassCard({ children, className="", style={} }) {
    return (
      <div className={`rounded-3xl border border-white/10 backdrop-blur-md ${className}`}
        style={{ background: "rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", ...style }}>
        {children}
      </div>
    );
}