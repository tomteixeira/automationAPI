import AutomationAPI from '../AutomationAPI';


export async function init(this: AutomationAPI) {
    if (this.debug) console.log("Initializing API...");

    try {
        const bodyAccessToken = `grant_type=client_credentials&client_id=${this.client_id}&client_secret=${this.client_secret}`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        if (this.debug) {
            console.log("Requesting access token with the following details:");
            console.log("Headers:", headers);
            console.log("Body:", bodyAccessToken);
        }

        let response = await this.fetchData('post', 'https://api.kameleoon.com/oauth/token', headers, bodyAccessToken);

        if (this.debug) console.log("Access token received:", response);

        this.access_token = response.access_token;
    } catch (error) {
        console.error("Error during initialization:", error);
    }
}