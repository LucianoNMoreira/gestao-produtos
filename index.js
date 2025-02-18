const jwt = require("jsonwebtoken");

// Essa chave deve ser armazenada em locais seguros, nunca diretamente no código
const JWT_SECRET_KEY = 'chave_secreta'

const usuario = { id: "123", role: "admin" };
// função jwt.sign: gera o token
// Parâmetro expiresIn - tempo de validade do token
const token = jwt.sign(usuario, JWT_SECRET_KEY, { expiresIn: "1h" });

console.log("Token JWT:", token);

try {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  console.log('Dados do JWT', decoded)
} catch (error) {
  console.error("Token inválido ou expirado:", error)
}
  