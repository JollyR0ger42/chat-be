import { Db } from "mongodb";
import dbConnect from "../db";
import UsersController from "./users";
import MessagesController from "./messages";

let db: Db, Users: any, Messages: any;

dbConnect().then((payload: Db) => {
  db = payload;
  Users = UsersController(db.collection('users'));
  Messages = MessagesController(db.collection('messages'));
});

export default {
  Users: () => Users,
  Messages: () => Messages
};
