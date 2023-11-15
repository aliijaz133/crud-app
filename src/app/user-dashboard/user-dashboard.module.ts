import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './time-graph/graph/graph.component';
import { TotalUserComponent } from './time-graph/total-user/total-user.component';
import { WalletChartComponent } from './time-graph/wallet-chart/wallet-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import { DollarGraphComponent } from './dollar-graph/dollar-graph.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    GraphComponent,
    TotalUserComponent,
    WalletChartComponent,
    LoaderComponent,
    DollarGraphComponent,
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class UserDashboardModule { }
