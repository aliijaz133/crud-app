import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/service/user.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('counter', [
      transition(':increment', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserListComponent implements OnInit {

  animationState: number = 0;

  userData!: any[];

  showLoader = false;

  private url: string = "http://localhost:3000/api/user-dashboard/user-list";


  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private ngzone: NgZone, private userService: UserService) { }

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
        // console.log('here is user data:::>,', this.userData);
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(users._id, result);
        this.toastr.success("This user data is successfully updated.")
      }
    });
  }

  updateUser(userId: string, newData: { userName?: string, userEmail?: string }) {
    this.userService.updateUser(userId, newData).subscribe(
      () => {
        // console.log(`User with ID ${userId} updated successfully.`);

        this.getUserData();
      },
      (error) => {
        // console.error(`Error updating user with ID ${userId}:`, error);
        this.toastr.error("Updating Error.")
      }
    );
  }



  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            // console.log(`User with ID ${userId} deleted.`);
            this.getUserData();
            this.toastr.success("This account is successfully deleted.");
          },
          (error) => {
            // console.error(`Error deleting user with ID ${userId}:`, error);
            this.toastr.error("Deleting Error.");
          }
        );
      }
    });
  }
}
