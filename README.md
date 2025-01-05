# 📃 cli-todo-list

cli-todo-list will handle your tasks. This project was build based on project idea on roadmap.sh: https://roadmap.sh/projects/task-tracker.

## ⚙️ Compiling the app
1. Clone the project to your local directory. 
1. Go to the project directory
1. Download the dependencies by typing `npm install` in a terminal
1. Compile the source code by typing `tsc`
1. The compiled code will be available in `./dist` directory

## 📖 How to use?
The general syntax to use the app:
```bash
node cli-todo.js <command>
```
Some commands may accept status as its argument. The available status for a task are `todo`, `in-progress`, `done`.

### Add task
```bash
node cli-todo.js add <description>
```

### List available tasks
The list command will print the `id`, `description`, and `status` of all tasks.
```bash
node cli-todo.js list [status]
```

### Update task status
```bash
node cli-todo.js mark-in-progress [id]
node cli-todo.js mark-done [id]
```

### Update task description
```bash
node cli-todo.js update [id] [description]
```

### Delete a task
```bash
node cli-todo.js delete [id]
```