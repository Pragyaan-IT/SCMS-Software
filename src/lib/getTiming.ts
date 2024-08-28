export const getTiming = (slot: string) => {
    switch (slot) {
        case '9':
            return '09:00 AM - 10:00 AM';
        case '10':
            return '10:00 AM - 11:00 AM';
        case '11':
            return '11:00 AM - 12:00 PM';
        case '12':
            return '12:00 PM - 01:00 PM';
        case '13':
            return '01:00 PM - 02:00 PM';
        case '14':
            return '02:00 PM - 03:00 PM';
    }
}