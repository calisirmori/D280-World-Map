import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldMap } from './components/map.component';

const routes: Routes = [
  {
    path: '',
    component: WorldMap
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
