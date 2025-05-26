import { init } from "./utils/init";
import { fetchData } from './utils/fetch'
import { getAllSiteCode, getAllSiteID } from './site/getter'

const axios = require('axios');

 type AAtest = {
    name: string, 
    siteId: number,
    goals: number[],
    baseURL: string,
    targetingConfiguration: string,
    type: string,
    mainGoalId: number
 }

class AutomationAPI {
    protected debug?: boolean;
    protected client_id: string;
    protected client_secret: string;
    protected access_token: string;
    protected config: object = {
        method: '',
        url: '',
        headers: {},
        data: '',
        maxBodyLength: Infinity,
    };

    init = init; // function to initiate the process
    protected fetchData = fetchData // function to fetch the data to the original automation API

    getAllSiteCode = getAllSiteCode;
    getAllSiteID = getAllSiteID;

    constructor(id: string, secret: string, debug?: boolean) {
        this.client_id = id;
        this.client_secret = secret;

        if (debug && debug === true) {
            this.debug = true;
            console.log("Debug mode is ON");
        }
    }



    async createAAtest(config: AAtest){
        try {
            const method = 'post';
            const url = `https://api.kameleoon.com/experiments`;
            const headers = {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': `Bearer ${this.access_token}`,
            };
            let data = JSON.stringify({
                name: config.name,
                siteId: config.siteId,
                goals: config.goals,
                baseURL: config.baseURL,
                targetingConfiguration: config.targetingConfiguration,
                type: config.type, 
                mainGoalId: config.mainGoalId
            });

            if (this.debug) {
                console.log("Creating new aa test with the following details:");
                console.log("Headers:", headers);
            }

            let response = await this.fetchData(method, url, headers, data);

            if (this.debug) console.log("Response for creating aa test:", response);


        } catch (error) {
            console.error("Error while create aa test :", error);
        }
    }

    async getGoalId() {
        try {
        const method = 'get';
        const url = `https://api.kameleoon.com/goals?page=1&perPage=200`;
        const url2 = `https://api.kameleoon.com/goals?page=2&perPage=200`;
        const headers = {
            'Accept': '*/*',
            'Authorization': `Bearer ${this.access_token}`,
        };

        if (this.debug) {
            console.log("Requesting segments Ids with the following details:");
            console.log("Headers:", headers);
        }

        let response = await this.fetchData(method, url, headers, '');
        let response2 = await this.fetchData(method, url2, headers, '');

        let allSiteID: Array<number> = [];
        response.forEach((site) => {
            if (site.id) {
                allSiteID.push(site.id);
            }
        
        });
        response2.forEach((site) => {
            if (site.id) {
                allSiteID.push(site.id);
            }
        
        });

        if (this.debug) console.log("Extracted goals Ids:", allSiteID);

        return allSiteID;
    } catch (error) {
        console.error("Error while fetching segment ids:", error);
    }
    }

    async getAllSegments() {
        if (this.debug) console.log("Fetching all segments Ids...");

        try {
            const method = 'get';
            const url = `https://api.kameleoon.com/segments`;
            const headers = {
                'Accept': '*/*',
                'Authorization': `Bearer ${this.access_token}`,
            };

            if (this.debug) {
                console.log("Requesting segments Ids with the following details:");
                console.log("Headers:", headers);
            }

            let response = await this.fetchData(method, url, headers, '');

            if (this.debug) console.log("Response for segment ids:", response);

            let allSiteID: Array<number> = [];
            response.forEach((site) => {
                if (site.id) {
                    allSiteID.push(site.id);
                }
            });

            if (this.debug) console.log("Extracted segment Ids:", allSiteID);

            return allSiteID;
        } catch (error) {
            console.error("Error while fetching segment ids:", error);
        }
    }

    async getOneSegment(siteId: number, segmentId: number) {

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

                if (this.debug) console.log("Response for goal creation:", response);

                returnObject[`${goal}`] = response.id;
            } catch (error) {
                console.error(`Error while creating goal: ${goal}`, error);
            }
        }

        if (this.debug) console.log("Final created goals object:", returnObject);

        return returnObject;
    }

    async createNewAcessToPageGoal(siteId: number, goals: Array<object>, matchType: string) {
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
                    name: `${Object.keys(goal)}`,
                    siteId: siteId,
                    type: 'URL',
                    hasMultipleConversions: true,
                    params: {
                        matchString: `${Object.values(goal)}`,
                        matchType: `${matchType}`
                    }

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
}

export default AutomationAPI;
