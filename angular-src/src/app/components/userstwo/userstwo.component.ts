import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CommandeService} from "../../commande.service";
import {Subject} from "rxjs/Subject";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ConfirmationService, Message, MessageService} from "primeng/api";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {
  MAT_DIALOG_DATA, MatDialog, matDialogAnimations, MatDialogRef, MatPaginator, MatSort,
  MatTableDataSource
} from "@angular/material";
import {DialogData, DialogDataExampleDialog, typecommade} from "../../show-cmd/show-cmd.component";
import {AuthService} from "../auth.service";
import {SelectionModel} from "@angular/cdk/collections";




export interface  test {

  id: Number;
  Nom :String;
  Tele: String;
  Adresse: String;
  Ville : String;
  Prenom : String;
  Email:String;
  Username:String;
  type:String;
}
export interface DialogData {
  users: any;
}


@Component({
  selector: 'app-userstwo',
  templateUrl: './userstwo.component.html',
  styleUrls: ['./userstwo.component.css'],
  providers: [ConfirmationService]
})




export class UserstwoComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  dtTrigger: Subject<any> = new Subject<any>();
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'username','Nom','Prenom','Email','Telephone','Ville','Adresse','buttons1','buttons2'];
  dataSource2:any;

  id:String;
  Nom:String;
  type: String;
  username:String;
  emaill:String;
  Telephone:String;
  privilege:Number;
  Ville:String;
  Addresse:String;
  Prenom:String;
  private formControl: FormGroup;
  msgs: Message[] = [];



  constructor(private CommandeService:CommandeService,
              public dialog: MatDialog,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }



  users: Array<test>;
  display: boolean = false;
  display2: boolean = false;
  email  = new FormControl('', [Validators.required, Validators.email]);
  selection = new SelectionModel<test>(true, []);
  ngOnInit() {
    this.valisateUsername =false;
    this.validatePass = false;


    this.CommandeService.getUsers().subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau getUsers');
      } else{
        // Calling the DT trigger to manually render the table

        this.dataSource2  = new MatTableDataSource<test>(data.users);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;

      }


    },err =>{
      console.log(err);
      return false;
    });
  }
  confirm2() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      accept: () => {

      },
      reject: () => {

;      }
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  isAllSelected() {

    this.dataSource2.data.forEach(row =>{
      if (this.selection.isSelected(row)) console.log('selected Row'+row);
    });
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => {


        //      if (this.dataSource2._renderData._value.includes(row,0)){
        this.selection.select(row);
//        }

      });
  }

  validatePass :Boolean = false;
  valisateUsername: Boolean = false;
  get name() { return this.formControl.get('username'); }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Il faut entrer une valeur' :
      this.email.hasError('email') ? 'Email invalid' :
        '';
  }

  modifier(user){
    this.display2 = true;

    this.id=user.id;
    this.Nom = user.Nom;
    this.Prenom = user.Prenom;
    this.username = user.username;
    this.Telephone = user.Telephone;
    this.Ville = user.Ville;
    this.Addresse = user.Adresse;
    this.emaill = user.Email;

  }

  openConfirmationDialog(user) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Vous voulez supprimer la commande : "+user.Nom;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // do confirmation actions
        this.CommandeService.supprimerUser(user).subscribe((data:any) =>{
          if (!data.success) {console.log('commande non ajouter');
          }
          else {
            const index: number = this.dataSource2.data.indexOf(user);
            if (index !== -1) {

              this.dataSource2.data.splice(index, 1);
              this.selection.clear();
              this.dataSource2 = new MatTableDataSource<test>(this.dataSource2.data);

            }

          }


        })
      }
      this.dialogRef = null;
    });
  }
  modifierUser(){

    var user = {
      id:this.id,
      username: this.username,
      Prenom: this.Prenom,
      Nom: this.Nom,
      Email:this.emaill,
      Telephone: this.Telephone,
      Ville: this.Ville,
      Adresse: this.Addresse
    };
    this.display2=false;
    this.CommandeService.modifierUser(user).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non ajouter');
      } else {


        this.CommandeService.getUsers().subscribe((data:any) =>{

          if (!data.success) {
            console.log('prob au niveau show-cmd.ts');
          } else{this.users = data.users;
            this.dataSource2  = new MatTableDataSource<test>(data.users);
            // Calling the DT trigger to manually render the table
          }


        },err =>{
          console.log(err);
          return false;
        });
      }

    })
  }

  supprimer(user){

  }



  openDialog3(user) {

    this.dialog.open(ModifierUsers, {
      data: {
        users : user
      }
    }).afterClosed().subscribe(()=>{
      this.CommandeService.getUsers().subscribe((data:any) =>{

        if (!data.success) {
          console.log('prob au niveau show-cmd.ts');
        } else{this.users = data.users;
          this.dataSource2  = new MatTableDataSource<test>(data.users);
          // Calling the DT trigger to manually render the table
        }


      },err =>{
        console.log(err);
        return false;
      });
    })


  }


}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'ModifierUsers.html',
})
export class ModifierUsers {

  id:Number;
  Nom:String;
  type: String;
  username:String;
  password:String;
  vpassword:String;
  emaill:String;
  Telephone:String;
  Ville:String;
  Addresse:String;
  Prenom:String;
  oldUsername:String;
  disable:Boolean=true;

  email  = new FormControl('', [Validators.required, Validators.email]);
  private formControl: FormGroup;
  private usernamechanged: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private CommandeService: CommandeService) {}
  ngOnInit(){
      this.id = this.data.users.id;
      this.username =  this.data.users.username;
      this.oldUsername = this.data.users.username;
      this.Prenom =  this.data.users.Prenom;
      this.Nom =  this.data.users.Nom;
      this.emaill = this.data.users.Email;
      this.Telephone =  this.data.users.Telephone;
      this.Ville =  this.data.users.Ville;
      this.Addresse =  this.data.users.Adresse;
      this.type = this.data.users.type;
    this.validatePass = false;
    this.valisateUsername = false;
    this.usernamechanged = false;
  }

  validatePass :Boolean = false;
  valisateUsername: Boolean = false;
  get name() { return this.formControl.get('username'); }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Il faut entrer une valeur' :
      this.email.hasError('email') ? 'Email invalid' :
        '';
  }



  modifierUser() {

    if (this.password != this.vpassword ) {
      this.validatePass = true;
    } else {

      var user = {
        id: this.id,
        username: this.username,
        Prenom: this.Prenom,
        Nom: this.Nom,
        Email: this.emaill,
        pass:this.password,
        Telephone: this.Telephone,
        Ville: this.Ville,
        type: this.type,
        Adresse: this.Addresse,
        usernameChanged:false
      };
      if (this.oldUsername != this.username){ user.usernameChanged = true;}


console.log(this.username+' old = '+this.oldUsername);
      this.CommandeService.modifierUser(user).subscribe((data:any) => {
        if (!data.success) {
          if (data.msg) {
          if (this.oldUsername != this.username) this.valisateUsername =true


          }

        } else {
     this.disable = false;
        }
      })
      user.usernameChanged = false;
    }
  }
}
