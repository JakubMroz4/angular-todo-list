import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { TodoFilter } from '../enums/todoFilterEnum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  visibilityFilter = TodoFilter.All;

  todos = this.todoService.getTodos(this.visibilityFilter);

  async updateList() {
    await this.sleep(150);
    this.todos = this.todoService.getTodos(this.visibilityFilter);
  }

  changeTaskVisibility() {
    if (this.visibilityFilter === TodoFilter.All) {
      this.visibilityFilter = TodoFilter.Completed;
    } else if (this.visibilityFilter === TodoFilter.Completed) {
      this.visibilityFilter = TodoFilter.NotCompleted;
    } else if (this.visibilityFilter === TodoFilter.NotCompleted) {
      this.visibilityFilter = TodoFilter.All;
    }
    console.log(this.visibilityFilter);
    this.updateList();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    this.updateList();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
    this.updateList();
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
