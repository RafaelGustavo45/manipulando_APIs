import express from 'express';
// Em vez de: import { PrismaClient } from '@prisma/client'
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
let users = [];

app.post('/usuarios', async (req, res) => {

  await prisma.user.create({
    data: {
        email: req.body.email,
        name: req.body.name,    
        age: req.body.age
    }
  })
  //console.log(req.body);
  //users.push(req.body);

  res.status(201).json(req.body);
})

app.get('/usuarios', async (req, res) => {
   
    users =[];
    console.log(req);

    const users = await prisma.user.findMany({
      where: {
        name: req.query.name
      }
    })
    res.status(200).json(users);

})


app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id) // CONVERSÃO AQUI
     }

   
    
  })

  res.status(204).json({message: 'Usuário deletado com sucesso'});

})

app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                // 1. Convertendo o ID para Inteiro
                id: parseInt(req.params.id) 
            },
            data: {
                // 2. Lendo do Body (JSON)
                email: req.body.email,
                name:  req.body.name,    
                age:   parseInt(req.body.age) // Certifique-se de que age também seja Int
            }
        });

        res.status(200).json(user); // 200 é o ideal para updates bem-sucedidos
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar", mensagem: error.message });
    }
});

/*
app.put('/usuarios/:id', async (req, res) => {

  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
        email: req.body.email,
        name: req.body.name,    
        age: req.body.age
    }
  })
  //console.log(req.body);
  //users.push(req.body);

  res.status(201).json(req.body);
}) 
  
*/


app.listen(3000);