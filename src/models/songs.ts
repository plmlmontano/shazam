import { ObjectId } from "mongodb";

export interface Songs {
    id?: ObjectId;
    layout: string;
    key: string;
    title: number;
}