const { tokenify, untokenify } = require("../persist/auth");
const { getUserByEmail } = require("../persist/users");
const { teachers } = require("../init/teachers");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");

beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
});

test('Encode then decode a user', async function() {
    const user = await getUserByEmail(teachers[0].user.email);
    expect(user).not.toBeNull();
    const token = tokenify(user);
    const decodedUser = untokenify(token);
    expect(decodedUser.name).toBe(user.name);
    expect(decodedUser.email).toBe (teachers[0].user.email);
});

test('Try to decode a user that does not exist',async function(){
    const user = await getUserByEmail('NotReal@fake.ca', 'QWERTY');
    expect(user== null);
    let fail = true;
    try{
        const token = tokenify(user);
    }
    catch{
        fail = false;
    }
    expect(fail).toBe(false)
})