
export const getUtcSecondsSinceEpoch = ():number => {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    return Math.round(utcMilllisecondsSinceEpoch / 1000);
}
