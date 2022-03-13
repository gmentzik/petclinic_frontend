
export const getUtcSecondsSinceEpoch = ():number => {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return Math.round(utcMilllisecondsSinceEpoch / 1000);
}

export const getUtcMillisecondsSinceEpoch = ():number => {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return utcMilllisecondsSinceEpoch;
}


export const localDateTimeFromUtcSecondsTimeStamp = (utcSeconds: number): string => {
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const d = new Date(utcSeconds * 1000 - timezoneOffset);
    return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
}

export const localDateTimeFromUtcMillisecondsTimeStamp = (utcSeconds: number): string => {
    // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    // d.setUTCSeconds(utcSeconds);
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const d = new Date(utcSeconds - timezoneOffset);
    return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
}