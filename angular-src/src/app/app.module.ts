import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SearchServiceService} from "./searchCmd.service";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InscComponent } from './components/insc/insc.component';
import {ValidateService} from './components/validate.service';
import {AuthService} from "./components/auth.service";
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { AddCommandeComponent } from './components/add-commande/add-commande.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ShowCmdComponent } from './show-cmd/show-cmd.component';
import { DialogDataExampleDialog} from './show-cmd/show-cmd.component';
import { Modifier} from './show-cmd/show-cmd.component';
import { ModifierStatut} from './show-cmd-statut/show-cmd-statut.component';
import { DialogDataExampleDialogStatut} from './show-cmd-statut/show-cmd-statut.component';
import {AuthGuard} from "./guard/auth.guard";
import { DashComponent } from './dash/dash.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material";
import {MatButtonModule} from '@angular/material/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {MatCheckboxModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatNativeDateModule} from "@angular/material";
import {PrivilegeService} from "./privilege.service";
import {ChartModule} from 'primeng/chart';
import {MatChipsModule} from '@angular/material/chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {CommandeService} from "./commande.service";
import {InplaceModule} from 'primeng/inplace';
import {MatIconModule} from '@angular/material/icon';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import {StatusService} from "./status.service";
import { ShowCmdStatutComponent } from './show-cmd-statut/show-cmd-statut.component';
import { PdfComponent } from './pdf/pdf.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MatProgressSpinnerModule} from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from "@angular/material";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {CommonModule} from "@angular/common";
import { UserstwoComponent } from './components/userstwo/userstwo.component';
import { ModifierUsers } from './components/userstwo/userstwo.component';
import { DialogDataExampleDialogComponent } from './dialog-data-example-dialog/dialog-data-example-dialog.component';
import { ModifierComponent } from './modifier/modifier.component';
import { TestComponent } from './test/test.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FactureComponent } from './facture/facture.component';
import {MatGridListModule} from '@angular/material/grid-list';


const appRoutes: Routes =
  [
    {path:'',component:ShowCmdComponent,canActivate:[AuthGuard]},
    {path:'insc',component:InscComponent},
    {path:'login',component:LoginComponent},
    {path:'addCmd',component:AddCommandeComponent,canActivate:[AuthGuard]},
    {path:'profil',component:ProfilComponent,canActivate:[AuthGuard]},
    {path: 'showCmd',component:ShowCmdComponent,canActivate:[AuthGuard]},
    {path: 'Facture',component:FactureComponent,canActivate:[AuthGuard]},
    {path:'dash',component:DashComponent,canActivate:[AuthGuard]},
    {path:'showCmdStatut',component:ShowCmdStatutComponent,canActivate:[AuthGuard]},
    {path:'user',component:UserstwoComponent,canActivate:[AuthGuard]},
    {path:'pdf',component:PdfComponent,canActivate:[AuthGuard]},
    {path:'**', redirectTo: ''}
];


@NgModule({
  declarations: [
    AppComponent,
    ModifierUsers,
    NavbarComponent,
    ModifierStatut,
    DialogDataExampleDialogStatut,
    LoginComponent,
    InscComponent,
    AddCommandeComponent,
    DialogDataExampleDialog,
    Modifier,
    ProfilComponent,
    ShowCmdComponent,
    DashComponent,
    ShowCmdStatutComponent,
    PdfComponent,
    UserstwoComponent,
    DialogDataExampleDialogComponent,
    ModifierComponent,
    TestComponent,
    ConfirmationDialogComponent,
    FactureComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatCheckboxModule,
    NgxIntlTelInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatFormFieldModule,
    BrowserModule,
    SpinnerModule,
    MatSortModule,
    MatSelectModule,
    ConfirmDialogModule,
    BsDropdownModule.forRoot(),
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    DropdownModule,
    MatRadioModule,
    MatCardModule,
    AccordionModule,
    ToastModule,
    PanelModule,
    CdkTableModule,
    MatIconModule,
    ChartModule,
    ProgressBarModule,
    ButtonModule,
    MatButtonModule,
    InplaceModule,
    CalendarModule,
    MatDividerModule,
    InputTextModule,
    DialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    DataTablesModule,
    ProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatInputModule

  ],
  entryComponents: [ ConfirmationDialogComponent,ModifierUsers,DialogDataExampleDialog,ModifierStatut,DialogDataExampleDialogStatut,Modifier,TestComponent],
  exports:[MatDialogModule],
  providers: [ValidateService,PrivilegeService,AuthService,StatusService,ConfirmationService,MessageService,AuthGuard,SearchServiceService,CommandeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
