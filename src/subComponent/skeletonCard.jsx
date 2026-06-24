export function SkeletonCard() {
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