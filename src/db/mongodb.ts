import mongoose from 'mongoose'

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost:27017/gestao-produtos'
).then(() => console.log("MongoDB conectado!"))
.catch(err => console.error("Erro ao conectar:", err))

export default mongoose
