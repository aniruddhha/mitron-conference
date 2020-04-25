import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallDashComponent } from './call-dash/call-dash.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'call-dash', component: CallDashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
