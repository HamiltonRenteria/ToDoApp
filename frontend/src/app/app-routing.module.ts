import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

// Definir rutas
const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' }, // Redirigir a la lista de tareas por defecto
  { path: 'todo', component: TodoComponent }  // Ruta para el componente de To-do List
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Opción 'useHash' para compatibilidad con navegadores antiguos
  exports: [RouterModule]
})
export class AppRoutingModule { }