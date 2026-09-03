import { test, expect } from '@playwright/test';

test('TC-API-010 - Get All Users', async ({ request }) => {

    const response = await request.get('/users');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('users');
    expect(Array.isArray(responseBody.users)).toBe(true);
    expect(responseBody.users.length).toBeGreaterThan(0);

    expect(responseBody.users[0]).toHaveProperty('id');
    expect(responseBody.users[0]).toHaveProperty('firstName');
    expect(responseBody.users[0]).toHaveProperty('lastName');
    expect(responseBody.users[0]).toHaveProperty('email');
});

test('TC-API-011 - Get User by Valid ID', async ({ request }) => {

    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(1);

    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('email');
});

test('TC-API-012 - Get User by Invalid ID', async ({ request }) => {

    const response = await request.get('/users/999999');

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('message');
});

test('TC-API-013 - Search Users', async ({ request }) => {

    const response = await request.get('/users/search?q=Emily');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('users');
    expect(Array.isArray(responseBody.users)).toBe(true);
    expect(responseBody.users.length).toBeGreaterThan(0);

    expect(responseBody.users[0]).toHaveProperty('firstName');
    expect(responseBody.users[0]).toHaveProperty('email');
});

test('TC-API-014 - Add User', async ({ request }) => {

    const response = await request.post('/users/add', {
        data: {
            firstName: 'Test',
            lastName: 'User',
            age: 25
        }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.firstName).toBe('Test');
    expect(responseBody.lastName).toBe('User');
    expect(responseBody.age).toBe(25);
});

test('TC-API-015 - Update User', async ({ request }) => {

    const response = await request.put('/users/1', {
        data: {
            firstName: 'UpdatedName'
        }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(1);

    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody.firstName).toBe('UpdatedName');
});

test('TC-API-016 - Delete User', async ({ request }) => {

    const response = await request.delete('/users/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(1);

    expect(responseBody).toHaveProperty('isDeleted');
    expect(responseBody.isDeleted).toBe(true);

    expect(responseBody).toHaveProperty('deletedOn');
});