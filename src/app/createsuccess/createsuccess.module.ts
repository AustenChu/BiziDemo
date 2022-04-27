import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesuccessPageRoutingModule } from './createsuccess-routing.module';

import { CreatesuccessPage } from './createsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesuccessPageRoutingModule
  ],
  declarations: [CreatesuccessPage]
})
export class CreatesuccessPageModule {}
