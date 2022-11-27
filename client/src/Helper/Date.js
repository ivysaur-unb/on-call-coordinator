export function numberToDate(numberIn){
    switch(numberIn){
        case 0: return 'January'
        case 1: return 'Febuary'
        case 2: return 'March'
        case 3: return 'April'
        case 4: return 'May'
        case 5: return 'June'
        case 6: return 'July'
        case 7: return 'Augest'
        case 8: return 'September'
        case 9: return 'October'
        case 10: return 'November'
        default: return 'December'
    }
}

export function weekDayToNumber(day){
    switch(day){
        case 'Monday': return 1;
        case 'Tuesday': return 2;
        case 'Wednesday': return 3;
        case 'Thursday': return 4;
        default: return 5;


    }
}

export function getWeekStart(){
    let currentDay = new Date();
    return new Date(currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1));
}
