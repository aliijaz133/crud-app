import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "signup",
    pathMatch: "full"
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "user-dashboard",
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(u => u.UserDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "signup",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
