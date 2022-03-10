import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseholdManagementPageRoutingModule } from './household-management-routing.module';

import { HouseholdManagementPage } from './household-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseholdManagementPageRoutingModule
  ],
  declarations: [HouseholdManagementPage]
})
export class HouseholdManagementPageModule {
}
