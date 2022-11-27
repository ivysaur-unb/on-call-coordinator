const { getAvailablePeriods } = require('./getAvailability');
const request = require("supertest");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");
const { absences } = require('../init/absences')

beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
});

test ('get all teachers', async function () {
    const availability = await getAvailablePeriods(absences[0].day);
    for(const teach in availability) {
        expect(typeof availability[teach].teacherId).toBe("number");
        expect(typeof availability[teach].scheduleId).toBe("number");
        expect(availability[teach].periods.length).toBe(0);
    }
}

)