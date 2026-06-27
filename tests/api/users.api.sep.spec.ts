import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
const AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`,
};
const BASE_URL = process.env.API_BASE_URL!;

let userId: number;
test.use({ apiBaseUrl: BASE_URL });

test.describe.serial('Executing E2E go rest crud api test', () => {

    test('GET API -- Get all users', async ({ apiHelper }) => {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('POST API -- Create user', async ({ apiHelper }) => {

        const userData = {
            name: `create_${Date.now()}`,
            email: `automation_${Date.now()}@open.test`,
            gender: 'male',
            status: 'active'
        };

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
        console.log("User Id:", userId);
    });

    test('PUT API -- Update user', async ({ apiHelper }) => {

        const userData = {
            name: `update_${Date.now()}`,
            status: 'inactive'
        };

        let response = await apiHelper.put(`/public/v2/users/${userId}`, userData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
        expect(response.body.id).toBe(userId);
    });


    test('DELETE API -- Delete user', async ({ apiHelper }) => {
        let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);
    });
});