import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DbService } from '../service/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit{
  addNewButton=false;
  @Input()
  type='';
  customType='';
  route=''
 
  checkoutForm = this.formBuilder.group({
   type:'',
   question: '',
   answer: ''
 });


   
 
 constructor(private formBuilder: FormBuilder ,  private dbService: DbService, private router: ActivatedRoute) {
  this.router.url.subscribe( (r)=> {
    this.route = r[0].path;
    });
 
 }
  @Output()
  change=new EventEmitter();
  ngOnInit(): void {
    if(this.route==='home'){
      this.type = this.customType;
    }
  }

  onSubmit(){
    if(this.route==='home'){
      this.type = this.customType;
    }
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
