/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del();
    await knex('users').insert([
        {
            id: 1,
            firstName: 'Demian',
            lastName: 'Holmberg',
            email: 'dholmberg@gmail.com',
            role: 'admin',
            // hash == 'admin'
            password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozfSwiaWF0IjoxNjgzNjM5MDkyLCJleHAiOjE2ODM4MTE4OTJ9.AKQzIb5yxR2UdX0IGGjII6RKQzzlKOe5Jk5OwGfAccY',
        },
    ]);
};
