import { test, expect } from '@playwright/test';

test('Verify user can update an existing product', async ({ request }) => {

    const updatedProduct = {
        title: 'Updated QA Laptop',
        price: 55000
    };

    const response = await request.put('/products/1', {
        data: updatedProduct
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBe('Updated QA Laptop');
    expect(responseBody.price).toBe(55000);
});