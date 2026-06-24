export function fmtDate(s) { return new Date(s+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}); }


export function parseLocation(query) {
    const value = query.trim();
  
    // Latitude,Longitude
    const coordsMatch = value.match(
       /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/
    );

    if (coordsMatch) {
      return {
        lat_long: [
          parseFloat(coordsMatch[1]),
          parseFloat(coordsMatch[2]),
        ],
      };
    }

    // ZIP code (digits only)
    if (/^\d+$/.test(value)) {
      return {
        zip_code: parseInt(value, 10),
      };
    }

    // Otherwise treat as city
    return {
      city: value,
    };
}