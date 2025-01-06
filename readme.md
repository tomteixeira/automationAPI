# Automation API node class

## How to use it ? 

You need to import the class into your script 
```js
 const axios = require('axios'); 
 ```

Then you need to initialize an instance of the class for your client :
There is a debug mode -> If you add a third parameter to true.
```js 
    const client_id: string = $client_id;
    const client_secret: string = $client_secret;

    const client = new AutomationAPI(client_id, client_secret);
    await client.init();
```

## All the methods 

#### init()
This method allows you to intialize the automation API. Technically, this methods will fetch the access_token and store it.
This is how you should use it : 
```js
 await client.init();
 ```


#### getAllSiteID()
This method allows you to fetch all the site ID of the client. It returns an array of integers. You are able to fetch up to 100 siteID at a time.
This is how you should use it : 
```js
 const allSiteID = await client.getAllSiteID();
 ```

#### createGoal()
This method allows you to create one or more goals for a sitecode. This function takes two parameters, the first one is a siteId and the second one is an array of goal(s). Be aware, you are able to create many goals with the same name using the automation API.
This is how you should use it : 
```js
let goals = [
    "premier goal",
    "deuxieme goal"
];
let newGoals = await client.createGoal(28974, goals);
 ```
 This method returns an object where the key is the name of the goal, and the value is the id. The idea is that it will be easier to create identic code for many projects since their ids will be different
```js
{ 'nameOfTheGoal': 361751, 'goal revenu': 361752 }
 ```

 #### createCD()
This method allows you to create one or more Custom Data for a sitecode. This function takes two parameters, the first one is a siteId and the second one is an array of goal(s). Be aware, you are able to create many Custom Data with the same name using the automation API.
This is how you should use it : 
```js
const cds: [string, string, (string | undefined)?][] = [ //It is mandatory to specify the type of the array in Typescript
    ["page_views", "NUMBER", "VISITOR"],
    ["isLoggedIn", "BOOLEAN"],
    ["lastPage", "STRING", "PAGE"],
    ["invalidName!", "STRING"], // Erreur: name invalide
    ["invalidType", "TEXT"], // Erreur: type invalide
    ["invalidScope", "BOOLEAN", "SESSION"], // Erreur: scope invalide
];
let newCD = await client.createCD(28974, cds)
console.log(newCD);
 ```
  This method returns an object where the key is the name of the custom data, and the value is the id. The idea is that it will be easier to create identic code for many projects since their ids will be different
```js
{ page_views: 27229, isLoggedIn: 27230, lastPage: 27231 }
 ```

 #### updateGlobalScript()
This method allows you to update the global script of a project. It takes two parameters, the first one is the siteId, and the second one is the new global script. Be aware, will erase the previous global script and replace it by the new one
This is how you should use it : 
```js
client.updateGlobalScript(siteId, "Hello world");
 ```


 --- Template ---

 #### nameOfTheMethod()
What the function does or not
This is how you should use it : 
```js
 code to show how to use it 
 ```
