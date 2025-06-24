import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { TemperatureUnits, getLocalTemperatureUnit, setLocalTemperatureUnit } from '../utils/TemperatureUtils';

const STORAGE_KEY = 'temperature_unit';

const DEFAULT_UNIT = TemperatureUnits.CELSIUS;

export let temperatureUnitSingleton = DEFAULT_UNIT;
export const getCurrentTemperatureUnit = () => temperatureUnitSingleton;

export const TemperatureUnitContext = createContext({
    unit: DEFAULT_UNIT,
    toggleUnit: () => { },
});

export const TemperatureUnitProvider = ({ children }) => {
    const [unit, setUnit] = useState(() => {
        return getLocalTemperatureUnit();
    });

    useEffect(() => {
        temperatureUnitSingleton = unit;
        setLocalTemperatureUnit(unit);
        // localStorage.setItem(STORAGE_KEY, unit);
    }, [unit]);;

    const toggleUnit = useCallback(() => {
        // setUnit(prev => (prev === TemperatureUnits.CELSIUS ? TemperatureUnits.FAHRENHEIT : TemperatureUnits.CELSIUS));
        setUnit(prev => {
            const newValue = prev === TemperatureUnits.CELSIUS ? TemperatureUnits.FAHRENHEIT : TemperatureUnits.CELSIUS;
            console.log("----- TEMPERATURE CONTEXT :: PREV:", { prev, newValue });
            return newValue
        });
    }, []);

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};

export const useTemperatureUnit = () => useContext(TemperatureUnitContext);
