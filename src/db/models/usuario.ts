import mongoose from '@/db/mongodb'

const UsuarioSchema = new mongoose.Schema({
    login: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    senha: { type: String, required: true },
    token_nova_senha: { type: String, required: true, index: true }
  },
  {
    versionKey: false
  }
)

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)

export default Usuario
