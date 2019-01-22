import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({

  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  showBackButton: boolean = false;

  constructor(public dialog: MatDialog, private location: Location) {
  }

  ngOnInit() {

    this.showBackButton = true;
  }

  ngDoCheck() {

    if (localStorage.getItem('BackButtonVisibility') == 'true') {

      this.showBackButton = false;
    } else {

      this.showBackButton = true;
    }
  }

  backButton() {

    if (localStorage.getItem("CurrentScreen") == 'platform') {

      this.location.path() == '';
    } else if (localStorage.getItem("CurrentScreen") == 'chamber') {

      this.location.back();
    } else if (localStorage.getItem("CurrentScreen") == 'product') {

      this.location.back();
    }
  }

  showExitDialog() {

    console.log('showExitDialog');

    const dialogRef = this.dialog.open(ExitDialog, {

      panelClass: 'exitDialogBorderRadius',
      width: '350px',
      // height: '170px',
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('showExitDialog dialogRef.afterClosed isFrom');
    });
  }
}

@Component({

  selector: 'exit-dialog',
  templateUrl: 'exit_dialog.html',
})

export class ExitDialog {

  constructor(public dialogRef: MatDialogRef<ExitDialog>, private router: Router, private route: ActivatedRoute) {

  }

  dialogCancel(): void {

    console.log("Dialog Exit");
    this.dialogRef.close();
  }

  dialogExit() {

    console.log("Dialog Exit");
    this.dialogRef.close();

    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}