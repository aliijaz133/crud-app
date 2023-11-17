import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { DollarGraphComponent } from './dollar-graph/dollar-graph.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MetaMaskComponent } from './meta-mask/meta-mask.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "prediction",
    component: DollarGraphComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "meta-mask",
    component: MetaMaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user-list",
    component: UserListComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: "**",
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
