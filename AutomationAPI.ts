const axios = require('axios');

interface segment {

}

interface segmentConfiguration {
    siteId: number, 
    name: string, 
    segmentType: string,
    conditionsData: segment, 
    audienceTracking?: (boolean | undefined),
    description?: (string | undefined), 
    tags?: (Array<string> | undefined), 
    isFavorite?: (boolean | undefined)

}

class AutomationAPI {
    private debug?: boolean;
    private client_id: string;
    private client_secret: string;
    private access_token: string;
    private config: object = {
        method: '',
        url: '',
        headers: {},
        data: '',
        maxBodyLength: Infinity,
    };

    constructor(id: string, secret: string, debug?: boolean) {
        this.client_id = id;
        this.client_secret = secret;

        if (debug && debug === true) {
            this.debug = true;
            console.log("Debug mode is ON");
        }
    }

    async init() {
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

    async getAllSiteID() {
        if (this.debug) console.log("Fetching all site IDs...");

        try {
            const method = 'get';
            const url = 'https://api.kameleoon.com/sites?perPage=100';
            const headers = {
                'Accept': '*/*',
                'Authorization': `Bearer ${this.access_token}`,
            };

            if (this.debug) {
                console.log("Requesting site IDs with the following details:");
                console.log("Headers:", headers);
            }

            let response = await this.fetchData(method, url, headers, '');

            if (this.debug) console.log("Response for site IDs:", response);

            let allSiteID: Array<number> = [];
            response.forEach((site) => {
                if (site.id) {
                    allSiteID.push(site.id);
                }
            });

            if (this.debug) console.log("Extracted site IDs:", allSiteID);

            return allSiteID;
        } catch (error) {
            console.error("Error while fetching site IDs:", error);
        }
    }

    async getAllSiteCode() {
        if (this.debug) console.log("Fetching all site codes...");

        try {
            const method = 'get';
            const url = 'https://api.kameleoon.com/sites?perPage=100';
            const headers = {
                'Accept': '*/*',
                'Authorization': `Bearer ${this.access_token}`,
            };

            if (this.debug) {
                console.log("Requesting site codes with the following details:");
                console.log("Headers:", headers);
            }

            let response = await this.fetchData(method, url, headers, '');

            if (this.debug) console.log("Response for site codes:", response);

            let allSiteCode: Array<number> = [];
            response.forEach((site) => {
                if (site.code) {
                    allSiteCode.push(site.code);
                }
            });

            if (this.debug) console.log("Extracted site codes:", allSiteCode);

            return allSiteCode;
        } catch (error) {
            console.error("Error while fetching site codes:", error);
        }
    }

    async createGoal(siteId: number, goals: Array<string>) {
        if (this.debug) console.log("Creating goals for site ID:", siteId);

        const method = 'post';
        const url = 'https://api.kameleoon.com/goals';
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${this.access_token}`,
        };

        let returnObject = {};
        for (const goal of goals) {
            if (this.debug) console.log(`Creating goal: ${goal}`);

            try {
                let data = JSON.stringify({
                    name: `${goal}`,
                    siteId: siteId,
                    type: 'CUSTOM',
                    hasMultipleConversions: true,
                });

                if (this.debug) {
                    console.log("Request payload for goal creation:", data);
                }

                let response = await this.fetchData(method, url, headers, data);

                if (this.debug) console.log("Response for goal creation:", response);

                returnObject[`${goal}`] = response.id;
            } catch (error) {
                console.error(`Error while creating goal: ${goal}`, error);
            }
        }

        if (this.debug) console.log("Final created goals object:", returnObject);

        return returnObject;
    }

    async createCD(siteId: number, cds: Array<[string, string, string?]>) {
        if (this.debug) console.log("Creating CD's for site ID:", siteId);

        const method = 'post';
        const url = 'https://api.kameleoon.com/custom-datas';
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${this.access_token}`,
        };

        let returnObject = {};
        for (const cd of cds) {

            const nameRegex = /^[a-zA-Z0-9_$]+$/;
            if (!nameRegex.test(cd[0])) {
                console.error(`Erreur: Le nom "${cd[0]}" n'est pas valide. Il doit être alphanumérique ou contenir des symboles de variable.`);
                continue;
            }
    
            const validTypes = ["STRING", "NUMBER", "BOOLEAN"];
            if (!validTypes.includes(cd[1])) {
                console.error(`Erreur: Le type "${cd[1]}" est invalide. Il doit être "STRING", "NUMBER" ou "BOOLEAN".`);
                continue;
            }
    
            const validScopes = ["PAGE", "VISIT", "VISITOR"];
            if (cd[2] && !validScopes.includes(cd[2])) {
                console.error(`Erreur: Le scope "${cd[2]}" est invalide. Il doit être "PAGE", "VISIT" ou "VISITOR" (ou absent).`);
                continue;
            }

            if (this.debug) console.log(`Creating CD: ${cd[0]}`);

            try {
                let data = JSON.stringify({
                    "format": `${cd[1]}`,
                    "method": "CLIENT",
                    "name": `${cd[0]}`,
                    "siteId": siteId,
                    "type": "UNIQUE",
                    "scope": `${cd[2] ? cd[2] : "VISIT"}`
                });

                if (this.debug) {
                    console.log("Request payload for cd creation:", data);
                }

                let response = await this.fetchData(method, url, headers, data);

                if (this.debug) console.log("Response for cd creation:", response);

                returnObject[`${cd[0]}`] = response.id;
            } catch (error) {
                console.error(`Error while creating cd: ${cd[0]}`, error);
            }
        }

        if (this.debug) console.log("Final created cds object:", returnObject);

        return returnObject;
    }

    async createSegment(siteId: number, segmentConfiguration: segmentConfiguration) {

    }


    async updateGlobalScript(siteId: number, newGlobalScript: string) {
        if (this.debug) console.log("Updating Global Script for site : ", siteId);

        try {
            let method = 'get';
            const url = `https://api.kameleoon.com/sites/${siteId}`;
            const headers = {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Authorization': `Bearer ${this.access_token}`,
            };

            if (this.debug) {
                console.log("Requesting Global script modification for following details:");
                console.log('Method:', method);
                console.log('Url: ', url);
                console.log("Headers:", headers);
            }

            let siteConfiguration = await this.fetchData(method, url, headers, '');
            console.log(siteConfiguration);
            if (siteConfiguration.trackingScript) {
                siteConfiguration.trackingScript = newGlobalScript;
            } else  {
                siteConfiguration['trackingScript'] = newGlobalScript;
            }

            method = 'put'

            if (this.debug) console.log("Site configuration for site ", siteId, " : ", siteConfiguration);

            await this.fetchData(method, url, headers, JSON.stringify(siteConfiguration));

            console.log("Global script update for siteId :", siteId, "have been successfully done");

        } catch (error) {
            console.error("Error during global script update:", error);
        }
    }





    // Helper functions
    private resetConfig() {
        if (this.debug) console.log("Resetting config...");
        this.config = {
            method: '',
            url: '',
            headers: {},
            data: '',
            maxBodyLength: Infinity,
        };
    }

    private async fetchData(method, url, headers, data) {
        this.resetConfig();
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
}

export default AutomationAPI;
