import { test, expect } from '../../src/fixtures/apifixtures';

const BASE_URL = process.env.API_BASE_URL!;
const TOKEN = process.env.API_TOKEN!;
const AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`,
};

test.use({ apiBaseUrl: BASE_URL });



async function createUser(apiHelper:any) {
    // Prepare sample user data for the create request
    const userData = {
        name: `create_${Date.now()}`,
        email: `automation_${Date.now()}@open.test`,
        gender: 'male',
        status: 'active'
    };

    // Create a new user through the API
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}


test('Creates a user and verifies the created details', async ({ apiHelper }) => {
    // Create a user and capture the generated ID
    let userResponse = await createUser(apiHelper);
    let userId = userResponse.id;
    console.log("User Id:", userId);

    // Fetch the same user and verify the returned details
    let response = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe(userResponse.name);
});

test('Creates a user, updates the user, and verifies the updated details', async ({ apiHelper }) => {
    // Create the user first so we have a valid ID to update
    let userResponse = await createUser(apiHelper);
    let userId = userResponse.id;
    console.log("User Id:", userId);

    // Prepare the updated data for the user
    const updatedUserData = {
        name: `update_${Date.now()}`,
        gender: 'female',
    };

    // Send the update request and verify the response
    let updatedResponse = await apiHelper.put(`/public/v2/users/${userId}`, updatedUserData, AUTH_HEADER);
    expect(updatedResponse.body.id).toBe(userId);
    expect(updatedResponse.body.name).toBe(updatedUserData.name);
    expect(updatedResponse.body.gender).toBe(updatedUserData.gender);

    // Fetch the updated user and verify the changes persist
    let response = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body.gender).toBe(updatedUserData.gender);
});


test('Creates a user, deletes the user, and verifies the user is no longer available', async ({ apiHelper }) => {
    // Create a user so there is a valid record to delete
    let userResponse = await createUser(apiHelper);
    let userId = userResponse.id;
    console.log("User Id:", userId);

    // Delete the created user and confirm the request succeeds
    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);

    // Try to fetch the deleted user and confirm it is gone
    let getResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
});