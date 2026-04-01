'use client';

import { useCallback } from 'react';

/**
 * A safe wrapper around the browser's native vibration API.
 * Supports pattern arrays (e.g., [50, 100, 50]) or simple durations.
 * Gracefully degrades on iOS Apple devices which do not support web vibration.
 */
export function useHaptic() {
    const triggerHaptic = useCallback((pattern: number | number[] = 50) => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                // Silently fail on unsupported browsers (some iOS WebViews)
            }
        }
    }, []);

    const heavyImpact = useCallback(() => triggerHaptic([50, 50, 100]), [triggerHaptic]);
    const lightImpact = useCallback(() => triggerHaptic(20), [triggerHaptic]);
    const successImpact = useCallback(() => triggerHaptic([20, 50, 20, 50, 100]), [triggerHaptic]);

    return { triggerHaptic, heavyImpact, lightImpact, successImpact };
}
