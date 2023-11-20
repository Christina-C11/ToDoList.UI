import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/to-do-list', pathMatch: 'full' }, // Default route is set to '/to-do-list-container'
  {
    path: 'to-do-list',
    loadChildren: () => import('./to-do-list/to-do-list.module').then((m) => m.ToDoListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
