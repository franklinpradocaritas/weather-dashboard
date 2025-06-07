
// export const summarizeFiveDayForecast = (forecastResponse) => {
//     const list = forecastResponse.list;

// export const summarizeFiveDayForecast = (list) => {
exports.summarizeFiveDayForecast = (list) => {
    if (!Array.isArray(list) || list.length === 0) return [];

    const now = new Date();
    const currentHour = now.getHours();

    const bestPerDay = {};

    for (const item of list) {
        const dateObj = new Date(item.dt * 1000);

        const isoDate = dateObj.toISOString();
        const dayKey = isoDate.split("T")[0];

        const hourAtEntry = dateObj.getHours();

        const diff = Math.abs(hourAtEntry - currentHour);

        if (!bestPerDay[dayKey]) {
            bestPerDay[dayKey] = {
                bestItem: item,
                bestDiff: diff
            };
        } else {
            if (diff < bestPerDay[dayKey].bestDiff) {
                bestPerDay[dayKey] = {
                    bestItem: item,
                    bestDiff: diff
                };
            }
        }
    }

    // 4. Tenemos en bestPerDay algo como:
    //    {
    //      "2021-06-05": { bestItem: {...}, bestDiff: 0 },
    //      "2021-06-06": { bestItem: {...}, bestDiff: 1 },
    //      ...
    //    }

    // Sacamos las claves y las ordenamos (ascendente por fecha)
    const sortedDays = Object.keys(bestPerDay).sort((a, b) => {
        // Como el formato es YYYY-MM-DD, comparar strings funciona
        if (a < b) return -1;
        if (a > b) return +1;
        return 0;
    });

    // 5. Tomamos las primeras 5 fechas (si hay menos de 5, tomará todas)
    const result = [];
    for (let i = 0; i < Math.min(5, sortedDays.length); i++) {
        const day = sortedDays[i];
        result.push(bestPerDay[day].bestItem);
    }

    return result;
};
