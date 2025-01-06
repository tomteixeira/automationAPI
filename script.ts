import AutomationAPI from './AutomationAPI.js';


// const client_id: string= '27773-rui-matos-kaspersky-com';
// const client_secret: string = '8FuBwxxvc8lXEkWXwAbB1My9VuLH8bjyAgNvGVECZ5k';

const client_id: string= '28252-tteixeira-kameleoon-com';
const client_secret: string = 'rK9WLJAB3mbU8k-HtMehBzvvqdwTVrPrki0Rsw3FDec';

async function main() {
    try {
        let siteId = 28974;
        const client = new AutomationAPI(client_id, client_secret, false);
        await client.init();


        await client.updateGlobalScript(siteId, "Hello world asdfkajsdfkajsfkajsdfhkajsdfh");
        let allSiteCode = await client.getAllSiteCode();
        console.log(allSiteCode);

        
    } catch (e) {
        console.error(e);
    }
}

main()

