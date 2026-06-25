
export default function Input({ className="", ...props }) {
    return (
      <input {...props}
        className=
        {
            `w-full bg-white/10 border border-white/20 rounded-2xl 
            px-4 py-3 text-sm text-white placeholder-white/30 
            focus:outline-none focus:ring-2 focus:ring-white/30 
            transition ${className}`
        } />
    );
}