import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  @ViewChild("textos") textos:any;

  constructor() {
    
  }

  ngOnInit(): void {
   // console.log(this.textos);
  }
}
