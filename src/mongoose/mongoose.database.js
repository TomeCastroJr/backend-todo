import mongoose from"mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gut2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

export default connectToDatabase;