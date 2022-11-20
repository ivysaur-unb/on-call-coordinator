const { tokenify, untokenify } = require("../routes/auth");
const { getUserByEmail } = require("../routes/users")

test('Encode then decode a user', async function(){
    const user = await getUserByEmail('cfiande1@unb.ca','mytestpass1');
    const token = await tokenify(user);
    const decodedUser =await untokenify(token);
    expect(decodedUser.name).toBe(user.name);
    expect(decodedUser.email).toBe ('cfiande1@unb.ca');
    expect(decodedUser.password).toBe('mytestpass1');
});

test('Try to decode a user that does not exist',async function(){
    const user = await getUserByEmail('NotReal@fake.ca', 'QWERTY');
    expect(user== null);
    let fail = true;
    try{
        const token = await tokenify(user);
    }
    catch{
        fail = false;
    }
    expect(fail).toBe(false)
})