import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent {
  addNewButton=false;
  @Input()
  type='';
 
  checkoutForm = this.formBuilder.group({
   type:'',
   question: '',
   answer: ''
 });


   
 
 constructor(private formBuilder: FormBuilder ,  private dbService: DbService) {
  
 
 }
  @Output()
  change=new EventEmitter();


  onSubmit(){
    this.checkoutForm.controls.type.setValue(this.type);
    this.dbService.addNew(this.checkoutForm.value).subscribe( );
    this.change.emit("true");
    this.checkoutForm.reset();
    this.addNewButton=false;
  
  }
  addNew(){
    this.addNewButton=true;
  }
  closeForm(){
    this.addNewButton=false;
  }

}
