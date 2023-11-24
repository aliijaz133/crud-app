import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import { DollarGraphComponent } from './dollar-graph/dollar-graph.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MetaMaskComponent } from './meta-mask/meta-mask.component';
import { DetailMetamaskComponent } from './detail-metamask/detail-metamask.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { TokenFormatPipe } from './pipe/token-format.pipe';
import { ExportAsModule } from 'ngx-export-as';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoaderComponent,
    DollarGraphComponent,
    PagenotfoundComponent,
    MetaMaskComponent,
    DetailMetamaskComponent,
    UserListComponent,
    EditDialogComponent,
    DeleteConfirmationComponent,
    TokenFormatPipe,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ExportAsModule,
    NgbTooltipModule,
  ],
})
export class UserDashboardModule {}
