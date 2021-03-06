import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { SubRoutingModule } from './sub-routing.module';
import { StorageService } from '../Services/storage.service';
import { ApiService } from 'src/app/Services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule,
  MatSelectModule,
  MAT_CHIPS_DEFAULT_OPTIONS
} from '@angular/material';
import { DashboardComponent, ExitDialog } from './dashboard/dashboard.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng2-select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import 'hammerjs';
import { PlatFormsComponent, PlatformHttpErrorDialog, SelectPlatformDialog, PlatformNetworkDialog } from './platforms/platforms.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatMenuModule } from '@angular/material/menu';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../Components/login/login.component';
import { ChamberMainModule } from '../Components/Chambers/chamber.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [

    DashboardComponent,
    PlatFormsComponent,
    LoginComponent,
    ExitDialog,
    PlatformHttpErrorDialog,
    SelectPlatformDialog,
    PlatformNetworkDialog
  ],

  imports: [

    BrowserModule, 
    FormsModule, 
    SelectModule, 
    ReactiveFormsModule,
    SubRoutingModule, 
    MatAutocompleteModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatSlideToggleModule,
    MatFormFieldModule, 
    MatInputModule, 
    OverlayModule, 
    OverlayPanelModule, 
    MatCardModule, 
    AccordionModule, 
    TooltipModule,
    MatRippleModule, 
    AccordionModule, 
    MatChipsModule, 
    MatIconModule, 
    Ng2SearchPipeModule, 
    MatMenuModule,
    MatDialogModule,
    ChamberMainModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule
  ],

  providers: [
    
    ApiService, 
    StorageService,
  ],

  entryComponents: [
    
    ExitDialog,
    PlatformHttpErrorDialog,
    SelectPlatformDialog,
    PlatformNetworkDialog
  ],

  bootstrap: []
})

export class SubModule { }
