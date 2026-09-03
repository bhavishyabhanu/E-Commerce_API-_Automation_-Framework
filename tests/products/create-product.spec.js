import { test, expect } from '@playwright/test';

test('Verify user can create a new product', async ({ request }) => {

    const newProduct = {
        title: 'QA Automation Laptop',
        price: 50000,
        description: 'Laptop created through API automation'
    };

    const response = await request.post('/products/add', {
        data: newProduct
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.id).toBeDefined();
    expect(responseBody.title).toBe('QA Automation Laptop');
    expect(responseBody.price).toBe(50000);
    expect(responseBody.description).toBe(
        'Laptop created through API automation'
    );
});