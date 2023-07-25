export const inBrowser = typeof window !== 'undefined';
export const uniqueId = () => `ID_${Date.now()}`