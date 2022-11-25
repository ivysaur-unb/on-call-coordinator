<<<<<<< HEAD
const { tokenify, untokenify } = require("../routes/auth");
const { getUserByEmail } = require("../routes/users")

test('Encode then decode a user', async function(){
    const user = await getUserByEmail('camfiander@gmail.com','CFiander');
    const token = await tokenify(user);
    const decodedUser =await untokenify(token);
    expect(decodedUser.name).toBe(user.name);
    expect(decodedUser.email).toBe ('camfiander@gmail.com');
    expect(decodedUser.password).toBe('CFiander');
=======
const { tokenify, untokenify } = require("../persist/auth");
const { getUserByEmail } = require("../persist/users")
const { teachers } = require("../init/teachers");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");

beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
});

test('Encode then decode a user', async function(){
    const user = await getUserByEmail(teachers[0].user.email,teachers[0].user.password);
    expect(user).not.toBeNull();
    const token = tokenify(user);
    const decodedUser = untokenify(token);
    expect(decodedUser.name).toBe(user.name);
    expect(decodedUser.email).toBe (teachers[0].user.email);
    expect(decodedUser.password).toBe(teachers[0].user.password);
>>>>>>> main
});

test('Try to decode a user that does not exist',async function(){
    const user = await getUserByEmail('NotReal@fake.ca', 'QWERTY');
    expect(user== null);
    let fail = true;
    try{
<<<<<<< HEAD
        const token = await tokenify(user);
=======
        const token = tokenify(user);
>>>>>>> main
    }
    catch{
        fail = false;
    }
    expect(fail).toBe(false)
})