import { useState } from 'react';
import { useTemperatureUnit } from '../../context/TemperatureUnitContext';
import {
    getLocalTemperatureUnit,
    TemperatureUnits,
} from '../../utils/TemperatureUtils';

export default function ToggleTemperatureUnit() {
    const { toggleUnit } = useTemperatureUnit();
    const [value, setValue] = useState(() => {
        const stored = getLocalTemperatureUnit();
        return stored == TemperatureUnits.FAHRENHEIT;
    });

    const handleUnitToggle = () => {
        setValue((prev) => !prev);
        toggleUnit();
    };
    return (
        <>
            <span className='me-2'>°C</span>
            <div className='form-check form-switch me-1'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='temperatureUnitSwitch'
                    checked={value}
                    onChange={handleUnitToggle}
                />
            </div>
            <span className='me-3'>°F</span>
            <i className='bi bi-thermometer-half text-danger fs-4'></i>
        </>
    );
}
