const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

/* 
    GET - Listar todos os alunos (RA, Nome, Curso)
    GET - Listar um alunoo através do RA informado (Nome, Turma, Cursos)
    POST - Adicionar um aluno na lista
    POST - Adicionar um curso para aluno
    PUT - Alterar os dados de um aluno através do RA
    PUT - Alterar o curso do aluno
    DELETE - Remover aluno da lista
    DELETE - Remover o curso do aluno
*/

var alunos = [
    {
        ra: 245,
        nome: 'Publio',
        turma: 'DSM',
        habilidades: [ 'JavaScript', 'ReactJS', 'Redux' ]
    },
    {
        ra: 321,
        nome: 'Leticia',
        turme: 'ADS',
        habilidades: [ 'JavaScript', 'Ruby on Rails', 'Node' ]
    }
];

app.get('/', (req, res) => {
    res.json(alunos);
});

app.get('/:ra', (req, res) => {
    const ra = req.params.ra;
    let aluno = alunos.find(x => x.ra == ra);

    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

app.post('/', (req, res) => {
    let aluno = {
        ra: req.body.ra,
        nome: req.body.nome,
        turma: req.body.turma,
        habilidade: req.body.habilidades
    };
    alunos.push(aluno);

    res.status(201).send('Aluno criado com sucesso');
});

app.post('/', (req, res) => {
    let aluno = alunos.findIndex(x => x.ra == req.body.ra);
    
    if (aluno) {
        res.status(409).send('Este aluno já está cadastrado');
    } else {
        alunos.push(req.body);
        res.status(201).send('Aluno criado com sucesso');
    }
});


app.put('/', (req, res) => {
    let ra = req.query.ra;

    index = alunos.findIndex(x => x.ra == ra);
    alunos[index] = {
        ra: req.body.ra,
        nome: req.body.nome,
        habilidades: req.body.habilidades
    };

    res.status(200).send('Aluno alterado com sucesso');
});

app.put('/:ra', (req, res) => {
    let ra = req.params.ra;
    let index = alunos.findIndex(x => x.ra == ra);
    let aluno = alunos.find(x => x.ra == ra);
    
    console.log(index);
    if (aluno) {
        res.status(404).send('Aluno não encontrado');
    } else {
        alunos[index]
        aluno.turma = req.body.turma;
        alunos[index] = aluno;
        res.status(200).send('Turma alterada com sucesso');
    }
});

app.delete('/', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra);
    console.log(index);
    if (index <= -1) {
        return res.status(404).send('Aluno não encontrado');
    }

    alunos.splice(index, 1);
    res.json(alunos);
});

app.delete('/:ra', (req, res) => {
    let ra = req.params.ra;

    index = alunos.findIndex(x => x.ra == ra);
    if (index < 0) {
        return res.status(404).send('Aluno não encontrado');
    }

    delete alunos[index].turma;
    res.status(200).send('O aluno foi excluído da turma com sucesso');
});

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
});