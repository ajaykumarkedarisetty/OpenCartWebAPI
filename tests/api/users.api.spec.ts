import { test, expect } from "@playwright/test";

const AUTH_TOKEN = {
    Authorization: "Bearer b012dd689b1c0303f166964ea043c6eccb58be56730889b29d82e4314920ed19",
};

const BASE_URL = "https://gorest.co.in/public/v2/users";


test('Get User Details with optional filters', async ({ request }) => {
    const userResponse = await request.get(BASE_URL, {
        headers: AUTH_TOKEN,
        params: {
            page: 1,
            per_page: 5,
            status: 'active'
        }
    });

    const jsonBody = await userResponse.json();

    expect(userResponse.status()).toBe(200);
    expect(Array.isArray(jsonBody)).toBeTruthy();
    expect(jsonBody.length).toBeGreaterThan(0);
    expect(jsonBody[0]).toHaveProperty('id');
    expect(jsonBody[0]).toHaveProperty('name');
    expect(jsonBody[0]).toHaveProperty('email');
});

test('Get Particular User Details', async ({ request }) => {
    const userResponse = await request.get(`${BASE_URL}/8514907`, {
        headers: AUTH_TOKEN
    });

    const jsonBody = await userResponse.json();

    expect(userResponse.status()).toBe(200);
    expect(jsonBody).toHaveProperty('id', 8514907);
    expect(jsonBody).toHaveProperty('name');
    expect(jsonBody).toHaveProperty('email');
    expect(jsonBody).toHaveProperty('status');
});


test('Create User', async ({ request }) => {
    const userData = {
        name: `first_${Date.now()}`,
        email: `automation_${Date.now()}@open.test`,
        gender: 'male',
        status: 'active'
    };

    const userResponse = await request.post(BASE_URL, {
        headers: AUTH_TOKEN,
        data: userData
    });

    const jsonBody = await userResponse.json();

    expect(userResponse.status()).toBe(201);
    expect(jsonBody).toHaveProperty('id');
    expect(jsonBody.name).toBe(userData.name);
    expect(jsonBody.email).toBe(userData.email);
    expect(jsonBody.gender).toBe(userData.gender);
    expect(jsonBody.status).toBe(userData.status);
});


test('Update User Details Using PATCH', async ({ request }) => {
    const userData = {
        name: `patched_${Date.now()}`,
        status: 'inactive'
    };

    const userResponse = await request.patch(`${BASE_URL}/8514907`, {
        headers: AUTH_TOKEN,
        data: userData
    });

    const jsonBody = await userResponse.json();

    expect(userResponse.status()).toBe(200);
    expect(jsonBody).toHaveProperty('id', 8514907);
    expect(jsonBody.name).toBe(userData.name);
    expect(jsonBody.status).toBe(userData.status);
});


test('Replace User Details Using PUT', async ({ request }) => {
    const userData = {
        gender: 'male'
    };

    const userResponse = await request.put(`${BASE_URL}/8514907`, {
        headers: AUTH_TOKEN,
        data: userData
    });

    const jsonBody = await userResponse.json();

    expect(userResponse.status()).toBe(200);
    expect(jsonBody).toHaveProperty('id', 8514907);
    expect(jsonBody.gender).toBe(userData.gender);
    
});


test('Delete User Details', async ({ request }) => {
    const createUserResponse = await request.post(BASE_URL, {
        headers: AUTH_TOKEN,
        data: {
            name: `delete_${Date.now()}`,
            email: `delete_${Date.now()}@open.test`,
            gender: 'male',
            status: 'active'
        }
    });

    const createdUser = await createUserResponse.json();
    expect(createUserResponse.status()).toBe(201);

    const deleteResponse = await request.delete(`${BASE_URL}/${createdUser.id}`, {
        headers: AUTH_TOKEN
    });

    expect(deleteResponse.status()).toBe(204);
});

