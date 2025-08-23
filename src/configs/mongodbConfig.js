import { env } from "~/configs/environmentConfig";
import { MongoClient, ServerApiVersion } from "mongodb";

// Khởi tạo một đối tượng trelloDatabaseInstance là null (chưa connect)
let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Kết nối database
export const CONNECT_DB = async () => {
  // kết nối với MongoDB Atlas đã khai báo trong mongoClientInstance
  await mongoClientInstance.connect();

  // kết nối thành công gán ngược lại trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

// export Trello Database Instance khi connect thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error("Must connect to Database first !!!");
  }
  return trelloDatabaseInstance;
};
