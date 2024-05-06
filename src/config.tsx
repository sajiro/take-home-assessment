import { Client } from "appwrite";

const collectionID = "663428ba00196c099e01"; // your collection ID
const databaseID = "663428b1002672194ee9"; // Your database ID
const bucketID = "6634293600125b739926";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("663428320019db203520"); // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

export { client, collectionID, databaseID, bucketID }; // Finally export the client to be used in projects.
