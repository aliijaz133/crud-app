import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';

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

  constructor(private http: HttpClient, public dialog: MatDialog, private toastr: ToastrService, private ngzone: NgZone) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.getUserData();

    setTimeout(() => {
      this.showLoader = false;
    });

  }



  getUserData(): void {
    this.http.get('http://localhost:3000/api/user-dashboard/user-list').subscribe(
      (response: any) => {
        this.userData = response;
        this.animationState++;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

  }

  editUser(User: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: User,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put(`http://localhost:3000/api/user-dashboard/user-list/${User._id}`, result)
          .subscribe(() => {
            console.log('User updated successfully');
            this.getUserData();
          });
      }
    });
  }

  deleteCurrent(index: number) {

    this.toastr.error("Internal server error","505 Error")
    const currentUser = this.userData[index];
    this.http.delete(`http://localhost:3000/api/user-dashboard/user-list/${currentUser._id}`, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log("This User is Deleted: ", currentUser);
          this.toastr.info("This user is deleted.");
          this.getUserData();
        } else {
          console.error('Unexpected response status:', response.status);
          this.toastr.error('Unexpected response status. Please try again.');
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Failed to delete user. Please try again.');
      }
    );
  }
}