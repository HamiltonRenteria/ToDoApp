import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.apiService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const newTask: Todo = {
        id: 0,  
        task: this.newTodo,
        completed: false
      };
      this.apiService.createTodo(newTask).subscribe(todo => {
        this.todos.push(todo);
        this.newTodo = '';
      });
    }
  }


  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.apiService.updateTodo(todo.id, todo).subscribe();
  }

  deleteTodo(todo: Todo): void {
    this.apiService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
}