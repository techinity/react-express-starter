export const isBrowser = () => typeof window !== 'undefined' && !('process' in window);
export const isNode = () => typeof window === 'undefined' || ('process' in window);
