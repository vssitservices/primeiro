const express = require('express');
const app = express();
const User = require('./models/User');
const Notas = require('./models/notas');

const sequelize = require('./models/db'); // Import the sequelize variable

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("pagina inicial")
});

app.post("/users", async (req, res) => {
    try {
        const user = await User.findOne({ where: { name: req.body.name } });
        if (user === null){
            return res.json({
                message: "tem não :(",
            });
        }else{
            return res.json(user);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: true,
            message: "Error fetching user from the database.",
        });
    }
});

app.post("/cadastrar", async (req,res) => {
    console.log(req.body)
    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem:"Usuário cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem:"Erro: Usuário não cadastrado!"
        })
    });
});

app.get("/notas", async (req, res) => {
    try {
        const notas = await Notas.findAll(); 
        return res.json(notas);
    }catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: true,
            message: "Error fetching user from the database.",
        });
    }
});

app.get("/average", async (req, res) => {
    try {
        const notas = await Notas.findAll();
        
        // Calculate average of averages
        let sumAverages = 0;
        for (const nota of notas) {
            const average = (nota.nota1 + nota.nota2 + nota.nota3 + nota.nota4) / 4;
            sumAverages += average;
        }
        const overallAverage = sumAverages / notas.length;
        
        // Log and return the overall average
        console.log("Overall Average:", overallAverage);
        return res.json({ overallAverage });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({
            error: true,
            message: "Error fetching notes from the database.",
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor iniciado em http://localhost:3000");
});
