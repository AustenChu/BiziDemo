import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseholdManagementPage } from './household-management.page';

const routes: Routes = [
  {
    path: '',
    component: HouseholdManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseholdManagementPageRoutingModule {}
