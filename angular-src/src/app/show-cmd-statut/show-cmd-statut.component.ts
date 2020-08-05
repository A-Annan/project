import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../components/auth.service";
import {SearchServiceService} from "../searchCmd.service";
import {CommandeService} from "../commande.service";
import {MessageService} from 'primeng/api';
import {StatusService} from "../status.service";



import {Angular5Csv} from "angular5-csv/Angular5-csv";
declare var $:any;

import {saveAs as importedSaveAs} from "file-saver";
import 'jspdf';
import 'jspdf-autotable';


import { Subject } from 'rxjs/Subject';
import {PdfComponent} from "../pdf/pdf.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {CmdData, DialogData} from "../show-cmd/show-cmd.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SelectionModel} from "@angular/cdk/collections";
import {DatePipe} from "@angular/common";
declare var $:any;
declare let jsPDF;
export interface typecommade {

  id: Number;
  Nom :String;
  Tele: String;
  Adresse: String;
  Ville : String;
  Produit : String;
  Quantite : String;
  Prix : String;
  Statut : String;
  Note : Number;
  user : String;
  tracking:String;
}
interface City {
  name: string;
}
class Message{
  severity:string;
  summary:string;
  detail:string;
}


@Component({
  selector: 'app-show-cmd-statut',
  templateUrl: './show-cmd-statut.component.html',
  styleUrls: ['./show-cmd-statut.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowCmdStatutComponent implements OnInit,OnDestroy {


  display2: boolean = false;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  dtTrigger: Subject<any> = new Subject<any>();

  //tableau pous stocker la reponse du serveur
  commande: Array<typecommade>;
  commandeCopie: Array<typecommade>;

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  //user qui creer la cmd
  user:Object;

  //selon rxjs
  searchTerm = new Subject<string>();

  //var used by primeng
  date: Date[];
  es: any;
  display: boolean = false;

  users: Object;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  expandedElement: typecommade;
  selection = new SelectionModel<typecommade>(true, []);


  //test

  cities: City[];
  selectedCity: {name:String;};
  validate: boolean =false;
  msgs: Message[] = [];
  mod:Boolean=false;
  supp:Boolean=false;


  getModifierPrivilege(){
    return this.mod;
  }
  getSuppPrivilege(){

    return this.supp;
  }








  displayedColumns: string[] = ['select','id', 'Nom', 'Tele', 'Ville','Produit','Quantite','Prix','Statut','Date','tracking'];
  dataSource2:any;

  constructor(
    private statusService:StatusService,
    public dialog: MatDialog,
    private searchService: SearchServiceService,
    private authService: AuthService,
    private commandeService:CommandeService,
    private messageService: MessageService
  ) {
    this.searchService.searchStatut(this.searchTerm,this.statusService.status)
      .subscribe((results:any) => {

          if (!results.success) {
            console.log('prob au niveau show-cmd.ts');
          } else{
            this.commande = results.commande;
          }}

        ,err =>{
          return false;
        }

      );
    this.cities = [
      {name: 'New'},
      {name: 'RP1'},
      {name: 'BV1' },
      {name: 'NUL1' },
      {name: 'TILL1' },
      {name: 'Ordered' },
      {name: 'RP2' },
      {name: 'BV2' },
      {name: 'NUL2' },
      {name: 'TILL2'},
      {name: 'Confirmed' },
      {name: 'Shipped' },
      {name: 'Returned' },
      {name: 'Delivred' }
    ];
  }
  spinner: Boolean=false;
  re = /\"/gi;
  moi = localStorage.getItem('username').replace(this.re,"")



  nom: String;
  id:String;
  tele: String;
  ville: String;
  adr: String;
  produit: String;
  quantite: String;
  prix: String;
  statut: String;
  note: String;
  date2: String;
  user2: String;
  tracking: String;
  nomField:string;


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


  ngOnInit() {

    this.mod =false;
    this.supp =false;
    let re = /\"/gi;


    var prive = localStorage.getItem('privilege');

    if (prive == '010' ||prive == '110' ||prive == '111' ||prive == '011' ){
      this.mod  = true;
    }
    if (prive == '001' ||prive == '011' ||prive == '101' ||prive == '111' ){
      this.supp  = true;
    }

    this.commandeService.getCommandeByStatus(this.statusService.status).subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau show-cmd.ts');
      } else{this.commande = data.commande;
        this.dataSource2  = new MatTableDataSource<typecommade>(this.commande);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      }


    },err =>{
      console.log(err);
      return false;
    });


    this.es = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di","Lu","Ma","Me","Je","Ve","Sa"],
      monthNames: [ "Janvier","février","Mars","Avril","Mai","Juin","Juillet","Août","September","Octobre","Novembre","Décembre" ],
      monthNamesShort: [ "Jan", "Févr", "Mars", "Avr", "Mai", "Juin","Juil", "Aou", "Sep", "Oct", "Nov", "Déc" ],
      today: 'Aujourd\'hui',
      clear: 'Effacer la Dates'
    }




  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }




  showDialog(cmd) {
    this.display = true;
    this.authService.showUser(cmd).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non ajouter');
      } else {
        console.log(data.commande);
        this.users = data.commande
      }

    })

  }

  effacerDate(){
    this.commandeService.getCommandeByStatus(this.statusService.status).subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau show-cmd.ts');
      } else{
        this.commande = data.commande;
        this.selection.clear();
        this.dataSource2  = new MatTableDataSource<typecommade>(this.commande);
      }


    },err =>{
      console.log(err);
      return false;
    });
  }

  dateEntrer(){
    var newDate1;
    var newDate2;
    if (this.date[1] != null ){
      newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
      newDate2 = this.date[1].getFullYear()+'-'+(this.date[1].getMonth()+1)+'-'+this.date[1].getDate();
      this.searchService.serchSecondDateStatut(newDate1,newDate2,this.statusService.status)
        .subscribe((results:any) => {

            if (!results.success) {
              console.log('prob au niveau show-cmd.ts');
            } else{
              results.commande.forEach(row =>{
                this.selection.clear();
                this.dataSource2 = new MatTableDataSource<typecommade>(results.commande);

              })
            }}

          ,err =>{
            return false;
          }

        );
    }else {
      newDate1 = this.date[0].getDate()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getFullYear();
      this.dataSource2.filter = newDate1;
    }


  }

  suivre(cmd){
    let re = /\"/gi;
    var data = {
      username: localStorage.getItem('username').replace(re,""),
      id: cmd.id
    }
    this.commandeService.suivreCmd(data).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non ajouter');
      }


    })

  }



  supprimer(cmd){
    this.commandeService.supprimerCmd(cmd).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non ajouter');
      }
      else {
        const index: number = this.commande.indexOf(cmd);
        if (index !== -1) {

          this.commande.splice(index, 1);

        }

      }


    })
  }

  test(cmd){
    let re = /\"/gi;
    let username =localStorage.getItem('username').replace(re,"");
    this.commande[this.commande.indexOf(cmd)].Statut = this.selectedCity.name;
    this.commandeService.updateStatut(cmd,username).subscribe((results :any)=> {

        if (!results.success) {
          console.log('prob au niveau show-cmd.ts');
        } else{
          console.log('cmd modifier');
        }}

      ,err =>{
        return false;
      }

    );
  }

  save(){
    var data = [];
    if ( this.selection.selected.length == 0){
      for (var i=0;i < this.dataSource2.filteredData.length;i++){


        data[i] = Object.values(this.dataSource2.filteredData[i]);
      }
    }
    else {
      for (var i=0;i < this.selection.selected.length;i++){


        data[i] = Object.values(this.selection.selected[i]);
      }
    }

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      headers: [ "id","Nom", "Tele","Ville","Addresse","Produit","Quantite","Prix","Statut","Note","Date","Utilisateurs","Tracking Number"]
    };

    new Angular5Csv(data, 'file',options);


  }


  ticket(){
    if ( this.selection.selected.length == 0){
      this.spinner = true;
      this.commandeService.ticket(this.dataSource2._renderData._value).subscribe(blob => {
          importedSaveAs(blob, 'test');
          this.spinner = false;
        }
      )
    }else {
      this.spinner = true;
      this.commandeService.ticket(this.selection.selected).subscribe(blob => {
          importedSaveAs(blob, 'test');
          this.spinner = false;
        }
      )
    }


  }

  pdf(){
    var pipe = new DatePipe('en-US');
    const now = Date.now();
    const myFormattedDate = pipe.transform(now, 'dd/MM/yy');

    var doc = new jsPDF('p', 'pt');


    var columns = [
      {title: "Nom", dataKey: "Nom"},
      {title: "Telephone", dataKey: "Tele"},
      {title: "Ville", dataKey: "Ville"},
      {title: "Adresse ", dataKey: "Adress"},
      {title: "Prod", dataKey: "Produit"},
      {title: "Quan", dataKey: "Quantite"},
      {title: "Prix", dataKey: "Prix"},
      {title: "T.Num", dataKey: "tracking"}



    ];

    var height = doc.internal.pageSize.height;
    doc.addImage('data:image/png;base64,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','png',15, 40, 180, 160)
    doc.text("DECLARATION D'EXPEDITION", 250, 150);
    if ( this.selection.selected.length == 0){
      doc.autoTable(columns,this.dataSource2._renderData._value, {
        startY: 200,
        theme:'grid',
        styles: {columnWidth: 'wrap'},
        columnStyles: {
          Adress: {columnWidth:30},
          Tele: {columnWidth:30},
          Ville:{columnWidth:30},
          Nom:{columnWidth:50}
        },
        margin: {top: 60},
        addPageContent: function(data) {
          doc.text("Header", 40, 30);
        }
      });
    }else{
      doc.autoTable(columns,this.selection.selected, {
        startY: 200,
        theme:'grid',
        styles: {columnWidth: 'wrap'},
        columnStyles: {
          Adress: {columnWidth:30},
          Tele: {columnWidth:30},
          Ville:{columnWidth:30},
          Nom:{columnWidth:50}
        },
        margin: {top: 60},
        addPageContent: function(data) {
          doc.text("Header", 40, 30);
        }
      });
    }

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);

    var pageCount = doc.internal.getNumberOfPages();
    for(var i = 0; i < pageCount; i++) {
      doc.setPage(i);
      doc.text(460,800, 'Date : '+myFormattedDate);
    }


    doc.save('table.pdf');
  }



  modifier(cmd){
    this.display2 = true;
    this.nom = cmd.Nom;
    this.tele = cmd.Tele;
    this.ville = cmd.Ville;
    this.adr =  cmd.Adress;
    this.produit = cmd.Produit;
    this.quantite = cmd.Quantite;
    this.prix = cmd.Prix;
    this.statut = cmd.Statut;
    this.note = cmd.Note;
    this.date2 = cmd.Date;
    this.id = cmd.id;
    this.tracking = cmd.tracking;


  }

  modifierCmd(){

    var commande = {
      id: this.id,
      Nom : this.nom,
      Tele : this.tele,
      ville : this.ville,
      Adress :  this.adr,
      Produit : this.produit,
      Quantite : this.quantite,
      Prix : this.prix,
      Statut : this.statut,
      Note : this.note,
      tracking: this.tracking

    }
    this.display2=false;


    this.commandeService.modifierCommande(commande).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non ajouter');
      } else {


        this.commandeService.getCommandeByStatus(this.statusService.status).subscribe((data:any) =>{

          if (!data.success) {
            console.log('prob au niveau show-cmd.ts');
          } else{this.commande = data.commande;


          }


        },err =>{
          console.log(err);
          return false;
        });
      }

    })
  }
  openDialog2(cmd) {



    this.dialog.open(DialogDataExampleDialogStatut, {
      data: {
        users : '',
        cmd: cmd

      }
    });
  }


  openDialog3(cmd) {

    this.dialog.open(ModifierStatut, {
      data: {
        cmd : cmd,
        commande: this.commande

      }
    }).afterClosed().subscribe(()=>{
      this.commandeService.getCommandeByStatus(this.statusService.status).subscribe((data:any) =>{

        if (!data.success) {
          console.log('prob au niveau show-cmd.ts');
        } else{this.commande = data.commande;
          this.selection.clear();
          this.dataSource2 = new MatTableDataSource<typecommade>(data.commande);

        }


      },err =>{
        console.log(err);
        return false;
      });
    })


  }

  openConfirmationDialog(cmd) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Vous voulez supprimer la commande : "+cmd.Nom;

    this.dialogRef.afterClosed().subscribe((result:any) => {
      if(result) {
        // do confirmation actions
        this.commandeService.supprimerCmd(cmd).subscribe((data:any) =>{
          if (!data.success) {console.log('commande non ajouter');
          }
          else {

            const index: number = this.dataSource2.data.indexOf(cmd);
            if (index !== -1) {

              this.dataSource2.data.splice(index , 1);
              this.selection.clear();
              this.dataSource2 = new MatTableDataSource<typecommade>(this.dataSource2.data);
               }
            }


        })
      }
      this.dialogRef = null;
    });
  }
}



@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: '../show-cmd/dialog-data-example-dialog.html',
})
export class DialogDataExampleDialogStatut {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private commandeService:CommandeService,private authService: AuthService) {}
  ngOnInit(){
    this.authService.showUser(this.data.cmd).subscribe((data:any) =>{
      if (!data.success) {console.log('data log non trouver');
      } else {
        this.data.users = data.commande;
      }

    })
  }
  date:any;
  searchDate() {
    var dateVariable = this.date._i.year +'-'+(this.date._i.month+1) +'-'+this.date._i.date;
    console.log(dateVariable);
    this.commandeService.searchDate(dateVariable).subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau show-cmd.ts');
      } else{

        this.data.users = data.users;


      }

    });

  }
}


@Component({
  selector: 'modifier-data-example-dialog',
  templateUrl: '../show-cmd/modifier.html',
})
export class ModifierStatut {


  commandeCopie: Array<typecommade>=null;
  nom: String;
  id:String;
  tele: String;
  ville: String;
  adr: String;
  produit: String;
  quantite: String;
  prix: String;
  statut: String;
  note: String;
  date2: String;
  user2: String;
  tracking: String;
  nomField:string;
  disable:Boolean=true;

  commande: Array<typecommade> ;


  constructor(@Inject(MAT_DIALOG_DATA) public data: CmdData,
              private commandeService:CommandeService) {}

  ngOnInit(){
    this.nom = this.data.cmd.Nom;
    this.tele = this.data.cmd.Tele;
    this.ville = this.data.cmd.Ville;
    this.adr =  this.data.cmd.Adress;
    this.produit = this.data.cmd.Produit;
    this.quantite = this.data.cmd.Quantite;
    this.prix = this.data.cmd.Prix;
    this.statut = this.data.cmd.Statut;
    this.note = this.data.cmd.Note;
    this.date2 = this.data.cmd.Date;
    this.id = this.data.cmd.id;
    this.tracking = this.data.cmd.tracking;
    this.commande = this.data.commande;

  }


  modifierCmd(){
    let re = /\"/gi;



    var commande = {
      id: this.id,
      Nom : this.nom,
      Tele : this.tele,
      ville : this.ville,
      Adress :  this.adr,
      Produit : this.produit,
      Quantite : this.quantite,
      Prix : this.prix,
      Statut : this.statut,
      Note : this.note,
      tracking: this.tracking,
      username: localStorage.getItem('username').replace(re,""),

    };

    this.commandeService.modifierCommande(commande).subscribe((data:any) =>{
      if (!data.success) {console.log('commande non modifier');
      } else {
this.disable = false;

      }

    })
  }

}


