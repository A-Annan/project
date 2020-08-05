import {Component, OnInit, Optional, Self} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, NgControl, ValidatorFn, Validators} from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-insc',
  templateUrl: './insc.component.html',
  styleUrls: ['./insc.component.css']
})
export class InscComponent implements OnInit {

  nom: String;
  hide = true;
  emaill: String;
  pass: String;
  adr: String;
  tele: String;
  ville: String;
  vpwd: String;
  prenom:String;
  privilege:Number;
 ajouter:Boolean = false;
 modifier:Boolean= false;
  supprimer:Boolean=false;

  username:String;
  private formControl: FormGroup;
  get name() { return this.formControl.get('username'); }

  constructor(private router: Router,
              private authService: AuthService){
  }


  ngOnInit() {
    this.valisateUsername =false;
    this.validatePass = false;

    this.formControl = new FormGroup({
      'username': new FormControl(this.username , [
        forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ])});

  }

  email  = new FormControl('', [Validators.required, Validators.email]);
  required  = new FormControl('', [Validators.required]);
  requiredNom  = new FormControl('', [Validators.required]);
  requiredPrenom  = new FormControl('', [Validators.required]);
  requiredVille  = new FormControl('', [Validators.required]);
  requiredUsername  = new FormControl('', [Validators.required]);
  requiredTele  = new FormControl('', [Validators.required]);
  requiredpass  = new FormControl('', [Validators.required]);
  requiredvpass  = new FormControl('', [Validators.required]);
  requiredAdresse  = new FormControl('', [Validators.required]);


  getErrorMessage() {
    return this.email.hasError('required') ? 'Il faut entrer une valeur' :
      this.email.hasError('email') ? 'Email invalid' :
        '';
  }
  getErrorMessage2() {
    return this.email.hasError('required') ? 'Il faut entrer une valeur' :
     '';
  }

  validatePass :Boolean = false;
  valisateUsername: Boolean = false;

  inscription() {
    var priv=0;
  if (this.ajouter) priv+=100;
  if (this.modifier) priv+=10;
  if (this.supprimer) priv+=1;
  console.log(priv);

   if (this.pass != this.vpwd ){
       this.validatePass = true;
    }else {
     const user = {
       nom: (this.nom == null) ? ' ' : this.nom,
       email: (this.emaill == null) ? ' ' : this.emaill,
       pass: (this.pass == null) ? ' ' : this.pass,
       adr: (this.adr == null) ? ' ' : this.adr,
       tele: (this.tele == null) ? ' ' : this.tele,
       ville: (this.ville == null) ? ' ' : this.ville,
       prenom: (this.prenom == null) ? ' ' : this.prenom,
       privilege: (priv == null) ? ' ' : priv,
       username: (this.username == null) ? ' ' : this.username

     };


     this.authService.inscriptionAuth(user).subscribe(
       (data:any) => {
         if (!data.success) {
           if (data.msg) {
             this.valisateUsername = true
           }

           this.router.navigate(['/insc']);
         } else {
           this.router.navigate(['/user']);
         }
       }
     )

   }

  }

}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
