const { createSchedule } = require('../Helper/createSchedule')
const { initializeDatabase } = require('../init/initializeDatabase');

beforeAll(() => {
    return initializeDatabase();
});

test('create schedule', async () => {
    let result = await createSchedule([{name: 'Colby Foster', period1: 'TIJ1O',period1Location: '1', period2: 'TGJ2O', period2Location: '2', period3: 'TGJ3M', period3Location: '3', period4: '', period14Location: ''}])
    expect(result.result.count).toBe(1);
    expect(result.errors.length).toBe(0);
})

test('Passing in bad arguments', async () => {
    expect(await createSchedule(null)).toEqual([{
        message: 'Invalid schedule.',
        data: null
    }]);
})