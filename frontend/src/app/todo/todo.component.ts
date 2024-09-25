import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  ngOnInit() {
    this.todos = [
      { id: 1, task: 'Aprender Angular 18', completed: false },
      { id: 2, task: 'Build a To-do list app', completed: false },
    ];
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const newTask: Todo = {
        id: this.todos.length + 1,
        task: this.newTodo,
        completed: false,
      };
      this.todos.push(newTask);
      this.newTodo = '';
    }
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(item => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
