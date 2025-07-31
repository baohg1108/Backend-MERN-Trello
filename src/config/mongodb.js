import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment";

// create var trelloDatabaseInstance is null because no connect
let trelloDatabaseInstance = null;

//create obj mongoClientInstance because connect with mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//connect db
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

//check connect database
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first!");
  return trelloDatabaseInstance;
};

//close connect database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
