import { test, expect } from '@playwright/test';

test('TC-API-008 - Delete Product', async ({ request }) => {

    const response = await request.delete('/products/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log(responseBody);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBe(1);
});