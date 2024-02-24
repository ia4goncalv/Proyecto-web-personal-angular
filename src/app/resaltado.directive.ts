import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnInit {

  constructor(
    public el: ElementRef
    ) {

   }

   ngOnInit(): void {
    var element = this.el.nativeElement;
    element.style.background = "blue";
    element.style.padding = "20px";

    element.innerText = element.innerText.toUpperCase();
   }

}
