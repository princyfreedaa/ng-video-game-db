import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos:Todo[] = [];

  constructor() { }

  inputTodo: string = '';

  ngOnInit() {
    this.todos = [
      {
        content: 'First Todo',
        completed: false
      },
      {
        content: 'Second Todo',
        completed: false
      }
  ]
  }
  toggleDone(id){
    this.todos.map((v,i) =>{
      if(id==i){
      v.completed = !v.completed
      }
      return v
    })
  }

  delete(id){
    this.todos = this.todos.filter((v,i) =>{
      if(id!=i)
      return v
    })
  }

  onSubmit(f:NgForm){
   this.todos = [...this.todos,{
    content: f.value.todoapp,
    completed: false
   }]
  f.reset();
  }

}
