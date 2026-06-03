export const vibrate = (pattern: number | number[] = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern);
    }
};

export const hapticFeedback = {
    success: () => vibrate([10, 30, 10]),
    error: () => vibrate([50, 30, 50]),
    warning: () => vibrate([30, 30]),
    selection: () => vibrate(5),
    light: () => vibrate(5),
    medium: () => vibrate(10),
    heavy: () => vibrate(20),
};
