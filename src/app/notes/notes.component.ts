import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {


  bank = '';
  type = "Notes";  
  constructor( private dbService:DbService) {
    this.getNew();
  }
  cchange(value)
  {
    setTimeout(() => {
      this.getNew();
    }, 300)   
  }
  getNew(){ 
    this.dbService.getData()
  .pipe(map (response=>{
    var array:any=[];
    for(const key in response)
    {
      if(response.hasOwnProperty(key))
      {
        array.push({ ...response[key] , id:key});   
      } 
    }  
    array=array.filter((demo)=>{ return demo.type=="Notes" });
    return array;
  }
  ))
  .subscribe((data)=>{ this.bank=data });
  }
}
