import { ObjectId } from "mongodb";

export interface Users {
    id?: ObjectId;
    email: string;
    password: string;
}