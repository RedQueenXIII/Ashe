// tests/todo.test.js
const request = require('supertest');
const app = require('../app'); // Certifique-se de exportar o app em app.js
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

beforeAll(async () => {
    // Configura a conexão com o banco de dados de teste
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    // Fecha a conexão após os testes
    await mongoose.connection.close();
});

beforeEach(async () => {
    // Limpa os dados antes de cada teste
    await Todo.deleteMany();
});

describe('Testando rotas de Todos', () => {
    it('Cria uma nova tarefa', async () => {
        const response = await request(app)
            .post('/todos')
            .send({
                title: 'Nova tarefa de teste'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Nova tarefa de teste');
        expect(response.body.completed).toBe(false);
    });

    it('Obtém todas as tarefas', async () => {
        // Cria uma tarefa para teste
        await Todo.create({ title: 'Tarefa de teste' });

        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('Tarefa de teste');
    });

    it('Atualiza uma tarefa', async () => {
        // Cria uma tarefa para teste
        const todo = await Todo.create({ title: 'Tarefa para atualizar' });

        const response = await request(app)
            .patch(`/todos/${todo._id}`)
            .send({
                title: 'Tarefa atualizada',
                completed: true
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Tarefa atualizada');
        expect(response.body.completed).toBe(true);
    });

    it('Deleta uma tarefa', async () => {
        // Cria uma tarefa para teste
        const todo = await Todo.create({ title: 'Tarefa para deletar' });

        const response = await request(app).delete(`/todos/${todo._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Todo deleted');

        // Verifica se foi realmente deletada
        const todos = await Todo.find();
        expect(todos.length).toBe(0);
    });
});
