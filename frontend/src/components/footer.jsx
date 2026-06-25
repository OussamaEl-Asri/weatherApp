

function Footer() {
    return (
        <div className="text-center mt-8 pb-5 flex items-center justify-center gap-4">
            <div 
                className="h-px flex-1" 
                style={{background:"rgba(255,255,255,0.06)"}}
            />

            <span className="text-white/20 text-xs">
                Powered by WeatherAPI · Google Maps · YouTube Data API <br></br> Made By Oussama El-Asri <br></br> connect with : oussameasri81@gmail.com
            </span>

            <div 
                className="h-px flex-1" 
                style={{background:"rgba(255,255,255,0.06)"}}
            />

        </div>
    )
}

export default Footer;