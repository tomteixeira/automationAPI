import AutomationAPI from './AutomationAPI.js';
import * as dotenv from 'dotenv';

dotenv.config();


const client_id: string = String(process.env.CLIENT_ID);
const client_secret: string = String(process.env.CLIENT_SECRET);

async function main() {
    try {
        const client = new AutomationAPI(client_id, client_secret);
        await client.init();

        
    } catch (e) {
        console.error(e);
    }
}

main()

