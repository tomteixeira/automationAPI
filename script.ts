import { all } from 'axios';
import AutomationAPI from './automationAPI/AutomationAPI.js';
import * as dotenv from 'dotenv';

dotenv.config();

type AAtest = {
    name: string, 
    siteId: number,
    goals: number[],
    baseURL: string,
    targetingConfiguration: string,
    type: string, 
    mainGoalId: number
}

const client_id: string = String(process.env.CLEMENT_ID);
const client_secret: string = String(process.env.CLEMENT_SECRET);

// function trouverElementsUniques(listeReferente, listeAComparer) {
//     // Convertir la liste de référence en Set pour des recherches plus rapides
//     const ensembleReference = new Set(listeReferente);
    
//     // Filtrer la deuxième liste pour ne garder que les éléments qui ne sont pas dans la première
//     const elementsUniques = listeAComparer.filter(element => !ensembleReference.has(element));
    
//     return elementsUniques;
//   }

async function main() {
    try {
        const client = new AutomationAPI(client_id, client_secret);
        await client.init();


        let allGoalsId = await client.getGoalId();
        let goalsname = [
            "page_view",
            "carousel swipe mobile",
            "view_item",
            "view_item_list",
            "quote_view_room",
            "quote_view_flight",
            "quote_view_luggage",
            "view_promotion",
            "merch",
            "select_duration",
            "select_item",
            "quotation_focus",
            "select_flight",
            "quote_view_transfert",
            "select_offer",
            "click",
            "select_date",
            "view_cart",
            "add_to_cart",
            "quote_view_CTA",
            "productpage_click_map",
            "quote_view_activity",
            "navigation",
            "select_guests",
            "payment_view_contact",
            "select_promotion",
            "merchandising_click",
            "carousel click desktop",
            "begin_checkout",
            "payment_view_CTA",
            "email_signin",
            "Error",
            "external_booking",
            "google_auth_signin",
            "email_signup",
            "google_auth_signup",
            "purchase",
            "share",
            "membership_signup_click",
            "facebook_signup",
            "facebook_signin"
        ];

        // 29442, 29443, 29449, 29678
        let siteId: number[] = [30024];

        let goalsId = {};
        siteId.forEach(async (id) => {
            setTimeout(async () => {
                let goalId = await client.createGoal(id, goalsname);
                goalsId[id] = goalId;
                console.log(id, goalId);
            }, 1500);
        });


        // let siteCode = 29105;
        // let mainGoalId = 363528;
        // let config: AAtest = {
        //     name: "[KAM] new test aa",
        //     siteId: siteCode,
        //     goals: [356116, 363528],
        //     baseURL: "example.com",
        //     targetingConfiguration: "SITE", 
        //     type: "CLASSIC", 
        //     mainGoalId: mainGoalId,
        // }
        // client.createAAtest(config);

        
    } catch (e) {
        console.error(e);
    }
}

main()

