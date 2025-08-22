const MONGODB_URI =
  "mongodb+srv://hoanggiabao110820055:1B4zE31pcoz7PPo1@cluster0-hoanggiabao.nqvfjda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-HoangGiaBao";

const DATABASE_NAME = "backend-mern-trello";

import { MongoClient, ServerApiVersion } from "mongodb";

// Khởi tạo một đối tượng trelloDatabaseInstance là null (chưa connect)
let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
});

// Kết nối database
export const CONNECT_DB = async () => {
  // kết nối với MongoDB Atlas đã khai báo trong mongoClientInstance
  await mongoClientInstance.connect();

  // kết nối thành công gán ngược lại trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
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
