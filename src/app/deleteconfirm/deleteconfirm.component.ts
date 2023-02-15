import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent implements OnInit {

  @Input() item:string | undefined // @input decorator is used to share data from parent to child

  @Output() oncancel=new EventEmitter()//event creation


  
  

  constructor(){

  }

  ngOnInit(): void {
    
  }

  onCancel(){
    //start event 
    this.oncancel.emit()

  }
}


