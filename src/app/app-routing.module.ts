import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnotherPageComponent } from './another-page/another-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'another-page',
    component: AnotherPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
