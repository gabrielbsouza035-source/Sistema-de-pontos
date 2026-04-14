import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Pool } from 'pg'; // Conexão com o Postgres
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function main() {
    const app = express();
    const port = 3000;

    // Configurações iniciais
    app.use(express.json());
    app.use(cors());
    app.use(passport.initialize());

    // Configuração do Banco de Dados
    const pool = new Pool({
        connectionString: 'sua_url_do_postgres_aqui'
    });

    app.get('/', (req, res) => {
        res.send('Servidor com Auth e Postgres Rodando!');
    });

    app.listen(port, () => {
        console.log(`🚀 Server on: http://localhost:${port}`);
    });
}

main();