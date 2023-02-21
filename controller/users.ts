import { Collection } from 'mongodb';
import { User, UserPublic, Users } from './types/UserTypes';

export default function (collection: Collection) {
  const addUser = async (login: string, password: string): Promise<UserPublic | false> => {
    let newUser: User | undefined;

    try {
      newUser = await collection.insertOne({ login, password });
    } catch (e) {
      console.log(e);
    }

    if (newUser) return { login };
    else return false;
  };

  const getUser = async (login: string): Promise<User | null> => {
    let user: User | null = null;

    try {
      user = await collection.findOne({ login });
    } catch (e) {
      console.log(e);
    }

    return user;
  };

  const getAll = async (login: string): Promise<UserPublic[] | null> => {
    let users: UserPublic[] | null = null;

    try {
      users = await collection
        .find({ login: { $ne: login } }, { projection: { _id: 0, login: 1 } })
        .toArray();
    } catch (e) {
      console.log(e);
    }

    return users;
  };

  return {
    addUser,
    getUser,
    getAll,
  };
};

