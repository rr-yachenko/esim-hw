import { expect, test } from '@playwright/test';
import { URL } from 'url';
import { receiveMessageOnPort } from 'worker_threads';


test("API", async ({ page, request }) => {

    //Authentication   
    const authentification = await request.post('https://sandbox-partners-api.airalo.com/v2/token', {
        data: {
            client_id: "7e29e2facf83359855f746fc490443e6",
            client_secret: "e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb",
            grant_type: "client_credentials",
        },
    });

    expect(authentification.status()).toBe(200);
    console.log("✅ Authentication:", authentification.status())

    const responseJson = await authentification.json();
    expect(responseJson.data).toHaveProperty('access_token');
    expect(responseJson.data).toHaveProperty('token_type');
    expect(responseJson.data).toHaveProperty('expires_in');

    const token: string = responseJson.data.access_token;
    expect(token).toBeDefined();


    //Endpoint 1 POST
    const formData = new URLSearchParams();
    formData.append('quantity', '6');
    formData.append('package_id', 'merhaba-7days-1gb');

    const order = await request.post('https://sandbox-partners-api.airalo.com/v2/orders', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData.toString(),
    });
    expect(order.status()).toBe(200);
    console.log("✅ POST:", order.status())

    const orderData = await order.json();

    //Verify order ID
    expect(orderData.data.package_id).toBe('merhaba-7days-1gb');

    //Verify order Quantity
    expect(orderData.data.quantity).toBe(6);

    //Endpoint 2 GET
    const orderId = await order.json()

    const getResponse = await request.get(`https://sandbox-partners-api.airalo.com/v2/sims?include=order`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const esimData = await getResponse.json();
    //console.log('eSIM Response:', esimData);
    console.log("✅ GET:", getResponse.status())


    const found = esimData.data.find((element) => element.simable.id === orderId.data.id);

    const simable = esimData.data[0].simable;

    expect(found.simable.quantity).toBe(6);
    expect(found.simable.package_id).toBe('merhaba-7days-1gb');
    console.log("✅ Order details:", found.simable.quantity);
    console.log("✅ Order properties:", found.simable.package_id);

});