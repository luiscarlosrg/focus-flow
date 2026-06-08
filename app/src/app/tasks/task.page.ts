import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BottomNavigationComponent } from '../shared/bottom-navigation/bottom-navigation';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BottomNavigationComponent]
})
export class TaskPage implements OnInit {

 tasks: Task[] = [
  {
    id: 1,
    name: 'Estudiar para examen',
    date: new Date(),
    categoria: 'Universidad',
    prioridad: 'Alta',
    completada: false
  }
];

  constructor() { }

  ngOnInit() {
    this.cargarTasks();
  }

  cambiarEstado(task:Task){
    console.log(task);
    this.guardarTasks();
  }

  agregarTask(){
    const nuevaTask: Task = {
      id: this.tasks.length +1,
      name: 'Nueva Tarea',
      date: new Date(),
      categoria: 'General',
      prioridad: 'Media',
      completada: false
    }
    this.tasks.push(nuevaTask)
    this.guardarTasks();
  }

  eliminarTask(id:number){
    this.tasks = this.tasks.filter(
      task => task.id !==id 
    );
    this.guardarTasks();
  }

  cargarTasks() {
    const datos= localStorage.getItem('tasks');

    if (datos) {
      this.tasks = JSON.parse(datos);

      this.tasks.forEach(task => {
        task.date = new Date(task.date);
      });
    }
  }

  guardarTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  get tareasCompletadas(): number {
    return this.tasks.filter(
      task => task.completada
    ).length;
  }
  
  get tareasPendientes(): number {
    return this.tasks.filter(
      task => !task.completada
    ).length;
  }

}
