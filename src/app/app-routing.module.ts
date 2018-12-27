import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AnotherPageComponent } from './another-page/another-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
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
