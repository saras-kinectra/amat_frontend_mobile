
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { StorageService } from './../../Services/storage.service';
import { ApiService } from './../../Services/api.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

declare var navigator; 
declare var connection;
declare var Connection;

@Component({

  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PlatFormsComponent implements OnInit {

  public platformsList: any[];
  selectedPosition;
  // public form: FormGroup;
  isShowToolTip:boolean = true;

  isButtonLabelCondition = false;
  selectedPlatform;

  toolTipIcon: string = "assets/Icon-Info-Inactive@1x.png";

  @ViewChild('opIdInput') opIdInput: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, public dialog: MatDialog) {

  }

  ngOnInit() {

    localStorage.clear();
    localStorage.setItem("CurrentScreen", "platform");

    this.selectedPlatform = "--";

    // this.form = this.formBuilder.group({

    //   platform: [null, [Validators.required]],
    // });

    this.opIdInput.nativeElement.focus();

    if(navigator.connection.type == 'none') {

      const dialogRef = this.dialog.open(PlatformNetworkDialog, {

        panelClass: 'platformHttpErrorDialogBorderRadius',
        width: '460px',
        // height: 'auto',
      });
    
      dialogRef.afterClosed().subscribe(result => {
    
        console.log('PlatformNetworkDialog dialogRef.afterClosed');
      });
    } else {

      this.getPlatforms();
    }

    document.addEventListener("online", this.onOnlineCallBack.bind(this), false);
    document.addEventListener("offline", this.onOfflineCallBack.bind(this), false);
  }

  onPlatFormListChange(event, index) {

    console.log("onPlatFormListChange", event._id, index);
  }

  onOnlineCallBack() {
    
    this.getPlatforms();
  }

  onOfflineCallBack() {

    this.platformsList.length = 0;

    this.selectedPlatform = "--";
    this.isButtonLabelCondition = false;

    const dialogRef = this.dialog.open(PlatformNetworkDialog, {

      panelClass: 'platformHttpErrorDialogBorderRadius',
      width: '460px',
      // height: 'auto',
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      console.log('PlatformNetworkDialog dialogRef.afterClosed');
    });
  }

  getPlatforms() {

    this.selectedPlatform = "--";
    this.isButtonLabelCondition = false;

    this.apiService.getPlatforms().subscribe(response => {

      console.log("Response - getPlatforms: ", response);

      this.platformsList = JSON.parse(JSON.stringify(response));

      console.log("Response - getPlatforms: json: ", this.platformsList);
    }, error => {
      
      console.log("error response", error);
      console.log("error status: ", error.status);
      console.log("error message: ", error.message);
      
      var errorCode = error.status;
      var errorMessage: string = '';

      if(errorCode == '0') {

        errorMessage = 'The server encountered an error. Please try again later';
      } else if(errorCode == '401') {

        errorMessage = 'You’re not authorized to access the resource that you requested';
      } else if(errorCode == '404') {

        errorMessage = 'The resource you’re looking for was not found';
      } else if(errorCode == '500') {

        errorMessage = 'The server encountered an error. Please try again later';
      } else {

        errorMessage = 'Something went wrong and we couldn\'t process your request';
      }

      console.log("error status after if: ", error.status);
      console.log("error message after if: ", error.message);

      const dialogRef = this.dialog.open(PlatformHttpErrorDialog, {

        panelClass: 'platformHttpErrorDialogBorderRadius',
        width: '460px',
        // height: 'auto',
        data: {errorMessage: errorMessage}
      });
    
      dialogRef.afterClosed().subscribe(result => {
    
        console.log('showPlatialog dialogRef.afterClosed isFrom');
      });
    });
  }

  // onToolTipMouseOver(): void {

  //   this.toolTipIcon = "assets/info_icon@1x.png";
  // }

  // onToolTipMouseOut(): void {

  //   this.toolTipIcon = "assets/Icon-Info-Inactive@1x.png";
  // }

  selectPlatform() {

    if(this.platformsList.length > 0) {

      const dialogRef = this.dialog.open(SelectPlatformDialog, {

        panelClass: 'dialogBorderRadius',
        width: '80%',
        // height: '200px',
        data: this.platformsList
      });
    
      dialogRef.afterClosed().subscribe(result => {
    
        var isFromDialog = localStorage.getItem('isPlatformDialogFrom');
  
        if(isFromDialog === 'select') {
          
          this.selectedPosition = localStorage.getItem('DialogSelectedPlatfrom');
          console.log('dialogRef afterClosed selectedPosition',this.selectedPosition);
  
          this.selectedPlatform = this.platformsList[this.selectedPosition].name;
          console.log('this.platformsList[this.selectedPosition].name',this.platformsList[this.selectedPosition].name);
          this.isButtonLabelCondition = true;
  
          localStorage.setItem("BackButtonVisibility", 'false');
        } else {
  
          // localStorage.setItem("BackButtonVisibility", 'false');
        }
      });
    } else {

    }
  }

  opIdValuechange(event) {
   
    if(event.target.value == "") {

      if(this.isButtonLabelCondition) {

        localStorage.setItem("BackButtonVisibility", 'false');
      } else {

        localStorage.setItem("BackButtonVisibility", 'false');
      }
    } else {

      localStorage.setItem("BackButtonVisibility", 'false');
    }
  }

  focusFunction() {

    this.isShowToolTip = true;
    this.toolTipIcon = "assets/Icon-Info-Inactive@1x.png";
  }

  focusOutFunction() {

    if(this.opIdInput.nativeElement.value == '' ){

      this.isShowToolTip = false;
      this.toolTipIcon = "assets/info_icon@1x.png";
    } else {

      this.isShowToolTip = true;
      this.toolTipIcon = "assets/Icon-Info-Inactive@1x.png";
    }
  }

  next() {

    localStorage.clear();

    console.log("next selectedPosition: ", this.selectedPosition);
    console.log("next opID: ", this.opIdInput.nativeElement.value);

    localStorage.setItem("SelectedPlatform", JSON.stringify(this.platformsList[this.selectedPosition]));
    localStorage.setItem("SelectedOPID", this.opIdInput.nativeElement.value);

    console.log("next selected platform: ", this.platformsList[this.selectedPosition]);

    this.router.navigate(['platform/chambers'], { relativeTo: this.route });
  }
}

@Component({

  selector: 'platform-Http-Error-dialog',
  templateUrl: 'patformHttpErrorDialog.html',
})

export class PlatformHttpErrorDialog {

  constructor(public dialogRef: MatDialogRef<PlatformHttpErrorDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
  }

  dialogOK() {
    
    console.log("Dialog Exit");
    this.dialogRef.close();

    // localStorage.clear();
    // this.router.navigate(['/dashboard']);
  }
}

export interface DialogData {

  errorMessage: string;
}

@Component({

  selector: 'select_platform_dialog',
  templateUrl: 'selectPlatformDialog.html',
})

export class SelectPlatformDialog {

  platformSelectedIcon: string;
  dummyPlatformArray: any[] = [];
  isChecked = true;
  selectedIndexArray;
  platformsList: any[] = [];
  dialogModel: DialogModel; 

  constructor(public dialogRef: MatDialogRef<SelectPlatformDialog>, @Inject(MAT_DIALOG_DATA) public mPlatformsList: SelectPlatformDialogData) {

    localStorage.setItem('isPlatformDialogFrom','cancel');
    console.log("Dialog platformsList: ", mPlatformsList);

    this.platformsList = JSON.parse(JSON.stringify(mPlatformsList));

    this.platformSelectedIcon = "assets/icon_checkmark@1x.png";

    for(var i = 0; i < this.platformsList.length; i++) {

      this.dialogModel = new DialogModel();
      this.dialogModel.id = this.platformsList[i].id;
      this.dialogModel.name = this.platformsList[i].name;
      this.dialogModel.facets_count = this.platformsList[i].facets_count;
      this.dialogModel.isSelected = false;

      this.dummyPlatformArray.push(this.dialogModel);
    }

    console.log("this.dummyPlatformArray: ",this.dummyPlatformArray);
  }

  getSelecetedPlatform(selectedPlatfromPosition) {

    console.log("getSelecetedPlatform",selectedPlatfromPosition);

    this.selectedIndexArray = selectedPlatfromPosition;
    localStorage.setItem('DialogSelectedPlatfrom',selectedPlatfromPosition);
    
    this.dummyPlatformArray = [];
            
    for(var i = 0; i < this.platformsList.length; i++) {

      this.dialogModel = new DialogModel();
      this.dialogModel.id = this.platformsList[i].id;
      this.dialogModel.name = this.platformsList[i].name;
      this.dialogModel.facets_count = this.platformsList[i].facets_count;
      if(selectedPlatfromPosition == i) {

        this.dialogModel.isSelected = true;
      } else {

        this.dialogModel.isSelected = false;
      }
      this.dummyPlatformArray.push(this.dialogModel);
    }
  }

  dialogCancel() {
    
    localStorage.setItem('isPlatformDialogFrom','cancel');
    this.dialogRef.close();

  }

  dialogSelect() {

    var isPlatformSelected = false;

    for(var i = 0; i < this.dummyPlatformArray.length; i++) {
      if(this.dummyPlatformArray[i].isSelected == true) {

        isPlatformSelected = true;
      }
    }
    
    if(isPlatformSelected) {

      localStorage.setItem('isPlatformDialogFrom','select');
      this.dialogRef.close();
    } else {
      
    }
  }
}

export class DialogModel {

  id;
  name;
  facets_count;
  isSelected: boolean;
}

export interface SelectPlatformDialogData {

  mPlatformsList: any[];
}

@Component({

  selector: 'platform-Network-dialog',
  templateUrl: 'patformNetworkDialog.html',
})

export class PlatformNetworkDialog {

  constructor(public dialogRef: MatDialogRef<PlatformNetworkDialog>) { 
  }

  dialogOK() {
    
    console.log("Dialog Exit");
    this.dialogRef.close();

    // localStorage.clear();
    // this.router.navigate(['/dashboard']);
  }
}