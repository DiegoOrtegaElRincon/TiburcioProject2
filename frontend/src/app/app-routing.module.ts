import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'car-list',
    pathMatch: 'full'
  },
  {
    path: 'add-car',
    loadChildren: () => import('./add-car/add-car.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'car-list',
    loadChildren: () => import('./car-list/car-list.module').then( m => m.CarListPageModule)
  },  {
    path: 'update-car',
    loadChildren: () => import('./update-car/update-car.module').then( m => m.UpdateCarPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
