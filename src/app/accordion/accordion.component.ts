import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {

  checkoutForm = this.formBuilder.group({
    type:'',
    question: '',
    answer: ''
  });
  constructor(private dbDervice:DbService, private formBuilder:FormBuilder){
  }
  update=false;
  uData='';
  id='';
  @Input() ibank: any;
  @Output()
  change = new EventEmitter();
  del(id){

    console.log(id)
    this.dbDervice.deleteData(id).subscribe();
    this.change.emit("true");
  }
  updateData(value,id){
    this.id = id;
    this.checkoutForm.controls.question.setValue(value.question);
    this.checkoutForm.controls.answer.setValue(value.answer);
    this.checkoutForm.controls.type.setValue(value.type);
    this.update=true;

  }
  closeForm(){
    this.update=false;
  }
  onSubmit(){
    this.dbDervice.updateData( this.id,this.checkoutForm.value).subscribe();
    this.change.emit("true");
    this.update=false; 
  }
}
