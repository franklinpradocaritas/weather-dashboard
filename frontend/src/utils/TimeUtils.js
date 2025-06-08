
export const formatShortTime = (dateObj = new Date()) => {
    try {
        let hours = dateObj.getHours();
        const mins = dateObj.getMinutes();
        const tt = hours < 12 ? 'AM' : 'PM';

        hours = hours % 12;
        if (hours === 0) hours = 12;

        const hh = String(hours).padStart(2, '0');
        const MM = String(mins).padStart(2, '0');

        return `${hh}:${MM} ${tt}`;

    } catch (error) {
        return '';
    }
}

export const formatShortDate = (dateObj = new Date()) => {
    try {
        return dateObj.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    } catch (error) {
        return '';
    }
}