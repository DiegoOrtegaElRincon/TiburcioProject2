import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBicyclePageRoutingModule } from './update-bicycle-routing.module';

import { UpdateBicyclePage } from './update-bicycle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBicyclePageRoutingModule
  ],
  declarations: [UpdateBicyclePage]
})
export class UpdateBicyclePageModule {}
