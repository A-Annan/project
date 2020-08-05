import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import * as html2canvas from 'html2canvas';
import 'jspdf';




declare let jsPDF;
declare var $:any;


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {


  constructor(   private dialogRef: MatDialogRef<PdfComponent>,
                      @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }



close() {

  var doc = new jsPDF();
 /* var specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  doc.fromHTML($('#test').html(), 15, 15, {
    'width': 170,
    'elementHandlers': specialElementHandlers
  });*/
  const elementToPrint = document.createElement('div');
  elementToPrint.innerHTML = 'test';
  elementToPrint.style.border = 'solid';
  doc.addHTML(elementToPrint, () => {

  });
  doc.save('web.pdf');

 }
}
