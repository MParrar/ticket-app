
const getCurrentWeek = () => {

    let nowTemp = new Date(Date.now()); // Hora actual
    let oneDayLong = 24 * 60 * 60 * 1000; // El número de milisegundos en un día

    let c_time = nowTemp.getTime(); // El tiempo de milisegundos de la hora actual
    let c_day = nowTemp.getDay() || 7; // El día de la semana a la hora actual

    let m_time = c_time - (c_day - 1) * oneDayLong; // La hora actual en milisegundos del lunes
    let s_time = c_time - (c_day - 7) * oneDayLong; // La hora actual en milisegundos del domingo

    let monday = new Date(m_time); // Establecer objeto de hora de lunes
    let sunday = new Date(s_time); // Establecer objeto de hora de domingo

    let m_year = monday.getFullYear();

    let m_month =
        monday.getMonth() < 10
            ? ('0' + (monday.getMonth() + 1)).slice(-2)
            : monday.getMonth();

    let m_date =
        monday.getDate() < 10
            ? ('0' + monday.getDate()).slice(-2)
            : monday.getDate();

    let s_year = sunday.getFullYear();

    let s_month =
        sunday.getMonth() < 10
            ? ('0' + (sunday.getMonth() + 1)).slice(-2)
            : sunday.getMonth();

    let s_date =
        sunday.getDate() < 10
            ? ('0' + sunday.getDate()).slice(-2)
            : sunday.getDate();

    const firstDay = m_year + '-' + (m_month + 1) + '-' + (m_date - 1);
    const lastDay = s_year + '-' + (s_month + 1) + '-' + (s_date);

    return [firstDay, lastDay];
}

module.exports = {
    getCurrentWeek
}