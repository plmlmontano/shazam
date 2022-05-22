import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Songs } from "../models/songs";
import { Users } from "../models/users";

export const collectionSongs: { songs?: mongoDB.Collection<Songs> } = {}
export const collectionUsers: { users?: mongoDB.Collection<Users> } = {}

export const connectDatabase = async () => {
    dotenv.config()

    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

    await client.connect()

    const db = client.db(process.env.DB_NAME)

    // await applySchemaValidation(db);

    // Songs
    const songsCollection = db.collection<Songs>(process.env.SONG_COLLECTION_NAME)
    collectionSongs.songs = songsCollection

    // Users
    const usersCollection = db.collection<Users>(process.env.USER_COLLECTION_NAME)
    collectionUsers.users = usersCollection

    console.log(`Successfully connected to database: ${db.databaseName} and collection Songs: ${songsCollection.collectionName} and collection Users: ${usersCollection.collectionName}`,)
}

const applySchemaValidation = async (db: mongoDB.Db) => {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["layout", "key", "title"],
            additionalProperties: false,
            properties: {
                _id: {},
                layout: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                key: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                title: {
                    bsonType: "string",
                    description: "must be a string and is required"
                }
            }
        }
    }

    await db.command({
        collMod: process.env.SONG_COLLECTION_NAME,
        validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.SONG_COLLECTION_NAME, { validator: jsonSchema });
        }
    })
}