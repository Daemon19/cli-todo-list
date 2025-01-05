import { existsSync, readFileSync, writeFileSync } from "node:fs";

enum Status {
    todo = 'todo',
    inProgess = 'in-progress',
    done = 'done'
};

interface Todo {
    id: number;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
};

let todos: Todo[] = loadTodos();

if (process.argv.length < 3) {
    console.log('Usage: cli-todo <command>');
    process.exit(1);
}

switch (process.argv[2]) {
    case 'list':
        if (process.argv.length < 4) {
            listTodos(todos);
            break;
        }
        const status = process.argv[3] as Status;
        if (!Object.values(Status).includes(status)) {
            console.log('Invalid status');
            process.exit(1);
        }
        const todosByStatus = todos.filter(todo => todo.status === status);
        listTodos(todosByStatus);
        break;
    case 'add':
        if (process.argv.length < 4) {
            console.log('Usage: cli-todo add <description>');
            process.exit(1);
        }
        todos.push({
            id: todos.length + 1,
            description: process.argv[3],
            status: Status.todo,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        saveTodos(todos);
        break;
    case 'update':
        if (process.argv.length < 5) {
            console.log('Usage: cli-todo update <id> <description>');
            process.exit(1);
        }
        const id = parseInt(process.argv[3]);
        const description = process.argv[4];
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            console.log('Todo not found :<');
            process.exit(1);
        }
        todo.description = description;
        todo.updatedAt = new Date();
        saveTodos(todos);
        break;
    case 'delete':
        if (process.argv.length < 4) {
            console.log('Usage: cli-todo delete <id>');
            process.exit(1);
        }
        const idToDelete = parseInt(process.argv[3]);
        todos = todos.filter(todo => todo.id !== idToDelete);
        saveTodos(todos);
        break;
    case 'mark-in-progress':
        if (process.argv.length < 4) {
            console.log('Usage: cli-todo mark-in-progress <id>');
            process.exit(1);
        }
        const idToMarkInProgress = parseInt(process.argv[3]);
        const todoToMarkInProgress = todos.find(todo => todo.id === idToMarkInProgress);
        if (!todoToMarkInProgress) {
            console.log('Todo not found :<');
            process.exit(1);
        }
        todoToMarkInProgress.status = Status.inProgess;
        todoToMarkInProgress.updatedAt = new Date();
        saveTodos(todos);
        break;
    case 'mark-done':
        if (process.argv.length < 4) {
            console.log('Usage: cli-todo mark-done <id>');
            process.exit(1);
        }
        const idToMarkDone = parseInt(process.argv[3]);
        const todoToMarkDone = todos.find(todo => todo.id === idToMarkDone);
        if (!todoToMarkDone) {
            console.log('Todo not found :<');
            process.exit(1);
        }
        todoToMarkDone.status = Status.done;
        todoToMarkDone.updatedAt = new Date();
        saveTodos(todos);
        break;
    default:
        console.log('Invalid command');
        process.exit(1);
}

function listTodos(todos: Todo[]) {
    if (todos.length === 0) {
        console.log('No todos found :>');
        return;
    }
    todos.forEach(todo => {
        console.log(`${todo.id}. ${todo.description} [${todo.status}]`);
    });
}

function loadTodos(): Todo[] {
    if (!existsSync('todos.json')) {
        writeFileSync('todos.json', '[]');
        return [];
    }

    const json = readFileSync('todos.json', 'utf-8');
    const todos: Todo[] = JSON.parse(json);
    return todos;
}

function saveTodos(todos: Todo[]) {
    writeFileSync('todos.json', JSON.stringify(todos));
}