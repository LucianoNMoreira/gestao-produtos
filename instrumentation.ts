// import Usuario from '@/db/models/usuario'
// import bcrypt from 'bcrypt'

// Usuario.findOne({
//     login: 'admin'
// }).then((user) => {
//   bcrypt.hash('admin', 10, function(err, hash) {
//     if (user) {
//       console.log("Resetando a senha do usuário para admin|admin")
//       user.senha = hash
//       user.save()
//     } else {
//       console.log("Criando usuário admin|admin")
//       Usuario.create({
//           login: 'admin',
//           senha: hash,
//           email: 'lucianonobremoreira@gmail.com'
//       })
//     }
//   });
// })
