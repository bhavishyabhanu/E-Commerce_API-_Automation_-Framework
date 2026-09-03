import { test, expect } from '@playwright/test';

test('Verify products API returns product list', async ({ request }) => {

    const response = await request.get('/products');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.products).toBeDefined();

    expect(responseBody.products.length).toBeGreaterThan(0);
});

test('Verify individual product details', async ({ request }) => {

    const response = await request.get('/products/1');

    expect(response.status()).toBe(200);

    const product = await response.json();

    expect(product.id).toBe(1);
    expect(product.title).toBeDefined();
    expect(product.price).toBeDefined();
});

test('Verify product search API', async ({ request }) => {

    const response = await request.get('/products/search?q=phone');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBeGreaterThan(0);
});

test('Verify products API respects limit parameter', async ({ request }) => {

    const response = await request.get('/products?limit=5');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBe(5);
    expect(responseBody.limit).toBe(5);
});


test('Verify products API supports pagination using skip', async ({ request }) => {

    const response = await request.get('/products?limit=5&skip=5');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.products).toBeDefined();
    expect(responseBody.products.length).toBe(5);
    expect(responseBody.skip).toBe(5);
    expect(responseBody.limit).toBe(5);
});