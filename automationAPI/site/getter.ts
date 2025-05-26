import AutomationAPI from "../AutomationAPI";

export async function getAllSiteID(this: AutomationAPI) {
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

export async function getAllSiteCode(this: AutomationAPI) {
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