import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { collectionSongs } from "../services/database.service";

// Validation de JOI
import validator from '../utilities/validator'
import songSchema from "../schemas-joi/songs.schemajoi";

// Token initial firebase
import { decodeToken } from '../firebase/admin.token'

export const songRouter = express.Router();
songRouter.use(express.json());

songRouter.get("/", decodeToken, async (req: Request, res: Response) => {
// songRouter.get("/", async (req: Request, res: Response) => {
    try {
        const songs = await collectionSongs.songs.find({}).toArray();
        res.json(songs).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

songRouter.get("/:id", decodeToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const song = await collectionSongs.songs.findOne({ _id: new ObjectId(id) });
        if (song) {
            res.json(song).status(200);
        } else {
            res.status(404).json({ message: "song not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

songRouter.post("/", validator.body(songSchema), async (req: Request, res: Response) => {
    try {
        const newsong = req.body;
        const result = await collectionSongs.songs.insertOne(newsong);

        result
            ? res.json({ "_id": result.insertedId }).status(201)
            : res.status(500).json({ message: "Error while inserting song" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

songRouter.put("/:id", decodeToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const song = req.body;

        const query = { _id: new ObjectId(id) };
        const result = await collectionSongs.songs.updateOne(query, { $set: song });

        result
            ? res.json(song).status(200)
            : res.status(500).json({ message: "Error while updating song" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

songRouter.delete("/:id", decodeToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collectionSongs.songs.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send("Languaje deleted");
        } else if (!result) {
            res.json({ message: `Failed to delete languaje with id ${id}` }).status(400);
        } else if (!result.deletedCount) {
            res.json({ message: `Languaje with id ${id} not found` }).status(404);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})
