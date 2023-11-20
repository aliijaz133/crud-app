import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  editForm: FormGroup;

  showLoader = false;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      userName: [userId.userName, Validators.required],
      userEmail: [userId.userEmail, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {

    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false;
    }, 1000);

  }

  onSaveClick(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
    this.showLoader = true;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
