
const STORAGE_KEY = 'temperature_unit';

export const TemperatureUnits = {
    CELSIUS: 'metric',
    FAHRENHEIT: 'imperial'
};

export const getLocalTemperatureUnit = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === TemperatureUnits.CELSIUS ? TemperatureUnits.CELSIUS : TemperatureUnits.FAHRENHEIT;
};

export const setLocalTemperatureUnit = (unit) => {
    localStorage.setItem(STORAGE_KEY, unit);
};