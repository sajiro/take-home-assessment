import { Account, Databases, Storage, ID } from "appwrite";
import { client, databaseID, collectionID, bucketID } from "./config";
import { Item } from "./models";

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

const login = async (email: string, password: string) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async (): Promise<any> => {
  try {
    const response = await account.deleteSession("current");
    return response;
  } catch (e) {
    console.error(e);
  }
};

const getContacts = async (): Promise<Item[] | undefined> => {
  try {
    const response = await database.listDocuments(databaseID, collectionID);
    const data: Item[] = response.documents.map(
      (document: unknown) => document as unknown as Item
    );

    const sortedData = data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedData;
  } catch (e) {
    console.error(e);
  }
};

const createContact = async (contact: Item) => {
  try {
    return database.createDocument(
      databaseID,
      collectionID,
      ID.unique(),
      contact
    );
  } catch (e) {
    console.error(e);
  }
};

const editContact = async (contactId: string, updatedContact: Item) => {
  try {
    return database.updateDocument(
      databaseID,
      collectionID,
      contactId,
      updatedContact
    );
  } catch (e) {
    console.error(e);
  }
};

const uploadItem = async (image: File) => {
  try {
    const response = await storage.createFile(bucketID, ID.unique(), image);
    return response;
  } catch (e) {
    console.error(e);
  }
};

const getPhoto = async (image: string) => {
  try {
    const response = await storage.getFileView(bucketID, image);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export {
  login,
  logout,
  editContact,
  getContacts,
  createContact,
  uploadItem,
  getPhoto,
};
