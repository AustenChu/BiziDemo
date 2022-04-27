import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesuccessPage } from './createsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: CreatesuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatesuccessPageRoutingModule {}
