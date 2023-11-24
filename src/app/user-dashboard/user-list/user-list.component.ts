import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/service/user.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('counter', [
      transition(':increment', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-in', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  animationState: number = 0;

  userData: any[] = [];

  searchQuery: string = '';

  incrementalId: number = 1;

  showLoader = false;

  asset = {
    pdf: '../../../assets/image/PDF_icon.png',
  };

  theme = {
    theme1: {
      'margin-right': '10px',
      width: '38px',
      height: '44px',
      cursor: 'pointer',
    },
  };

  @ViewChild('myTableElementId') myTableElementId?: ElementRef;

  // @ViewChild('userList', { static: false }) userList!: ElementRef;

  private url: string = 'http://localhost:3000/api/user-dashboard/user-list';

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    options: {
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      pageWidth: 210,
      pageHeight: 297,
      margins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
      image: { type: 'pdf', quality: 100 },
    },
    elementIdOrContent: 'myTableElementId',
  };

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService,
    private exportAsService: ExportAsService
  ) {}

  ngOnInit(): void {
    this.showLoader = true;

    this.getUserData();

    setTimeout(() => {
      this.showLoader = false;
    });
  }

  getUserData(): void {
    this.http.get(this.url).subscribe(
      (response: any) => {
        this.userData = response;
        this.animationState++;
        // console.log("User List: ", this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  editUser(users: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: users,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(users._id, result);
        this.toastr.success('This user data is successfully updated.');
      }
    });
  }

  updateUser(
    userId: string,
    newData: { userName?: string; userEmail?: string }
  ) {
    this.userService.updateUser(userId, newData).subscribe(
      () => {
        // console.log(`User with ID ${userId} updated successfully.`);

        this.getUserData();
      },
      (error) => {
        // console.error(`Error updating user with ID ${userId}:`, error);
        this.toastr.error('Updating Error.');
      }
    );
  }

  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            // console.log(`User with ID ${userId} deleted.`);
            this.getUserData();
            this.toastr.success('This account is successfully deleted.');
          },
          (error) => {
            // console.error(`Error deleting user with ID ${userId}:`, error);
            this.toastr.error('Deleting Error.');
          }
        );
      }
    });
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();

    if (filterValue === '') {
      this.getUserData();
    } else {
      this.userData = this.userData.filter(
        (user) =>
          user.userName.toLowerCase().includes(filterValue) ||
          user.userEmail.toLowerCase().includes(filterValue) ||
          user.userMobile.toLowerCase().includes(filterValue)
      );
    }
  }

  generatePDF() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.exportAsService
        .save(this.exportAsConfig, 'User List')
        .subscribe(() => {
          this.toastr.success('Pdf file has been created successfully.');
        });
    }, 2000);
  }
}
