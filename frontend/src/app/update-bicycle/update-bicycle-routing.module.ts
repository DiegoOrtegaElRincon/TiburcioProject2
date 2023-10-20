import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBicyclePage } from './update-bicycle.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBicyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBicyclePageRoutingModule {}
