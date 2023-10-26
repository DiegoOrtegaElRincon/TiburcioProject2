import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-bicycles',
    pathMatch: 'full'
  },
  {
    path: 'add-bicycle',
    loadChildren: () => import('./add-bicycle/add-bicycle.module').then( m => m.AddBicyclePageModule)
  },
  {
    path: 'list-bicycles',
    loadChildren: () => import('./list-bicycles/list-bicycles.module').then( m => m.ListBicyclesPageModule)
  },  {
    path: 'update-bicycle',
    loadChildren: () => import('./update-bicycle/update-bicycle.module').then( m => m.UpdateBicyclePageModule)
  },
  {
    path: 'add-car',
    loadChildren: () => import('./add-car/add-car.module').then( m => m.AddCarPageModule)
  },
  {
    path: 'car-list',
    loadChildren: () => import('./car-list/car-list.module').then( m => m.CarListPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
