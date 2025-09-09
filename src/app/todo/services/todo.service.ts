import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;

  private apiUrl: string =
    'https://boolean-uk-api-server.fly.dev/JakubMroz4/todo';

  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  // DONE replace with a get request
  todos: Promise<Todo[]> = this.fetchTodos();

  async refreshTodos(): Promise<void> {
    this.todos = this.fetchTodos();
  }

  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  }

  async addTodo(title: string): Promise<Todo> {
    // DONE: replace with a POST request
    const todo = {
      title: title,
    };
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to POST todo');
    }

    this.refreshTodos();
    return await response.json();
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const response = await fetch(this.apiUrl + '/' + updatedTodo.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updatedTodo.title,
        completed: updatedTodo.completed,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to POST todo');
    }

    this.refreshTodos();
    return await response.json();
  }
}
