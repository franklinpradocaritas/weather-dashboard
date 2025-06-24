import { useEffect, useState } from 'react';
import { useTemperatureUnit } from '../../context/TemperatureUnitContext';
import {
    TemperatureUnits,
    getLocalTemperatureUnit,
} from '../../utils/TemperatureUtils';

const getTemperatureUnitSymbol = (value) => {
    let symbol = null;
    switch (value) {
        case TemperatureUnits.FAHRENHEIT:
            symbol = '°F';
            break;
        case TemperatureUnits.CELSIUS:
            symbol = '°C';
            break;
        default:
            symbol = '°C';
            break;
    }
    return symbol;
};

export default function TemperatureUnit() {
    const { unit } = useTemperatureUnit();
    const [symbol, setSymbol] = useState(() => {
        return getTemperatureUnitSymbol(getLocalTemperatureUnit());
    });

    useEffect(() => {
        setSymbol(getTemperatureUnitSymbol(unit));
    }, [unit]);

    return <>{symbol}</>;
}
