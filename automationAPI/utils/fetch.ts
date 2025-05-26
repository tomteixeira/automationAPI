import AutomationAPI from '../AutomationAPI';

const axios = require('axios');

    // Helper functions
    export function resetConfig() {
        this.config = {
            method: '',
            url: '',
            headers: {},
            data: '',
            maxBodyLength: Infinity,
        };
    }

    export async function fetchData(this: AutomationAPI, method, url, headers, data) {
        this.config = {
            method: '',
            url: '',
            headers: {},
            data: '',
            maxBodyLength: Infinity,
        };
        this.config = { method, url, headers, data };
        this.config['maxBodyLength'] = Infinity;

        if (this.debug) {
            console.log("Fetching data with the following config:");
            console.log(this.config);
        }

        try {
            let response = await axios(this.config);

            if (this.debug) console.log("Fetch response data:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error during fetch operation:", error);
            throw error;
        }
    }