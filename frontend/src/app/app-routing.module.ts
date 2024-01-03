import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddplaylistComponent } from './addplaylist/addplaylist.component';

const routes: Routes = [
  {
    path: 'action/createPlayList',
    component: AddplaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
