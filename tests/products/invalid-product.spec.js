import { test, expect } from '@playwright/test';

test('TC-API-009 - Get Product with Invalid ID', async ({ request }) => {

    const response = await request.get('/products/999999');

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Product with id \'999999\' not found');
});