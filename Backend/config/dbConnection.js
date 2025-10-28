import mongoose from "mongoose";
export const ConnectTODB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection is established");
  } catch (error) {
    console.log("Error connectiing to database");
  }
};
