import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent {
  
  bank = '';
  type = "Bootstrap";  
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
    array=array.filter((demo)=>{ return demo.type=="Bootstrap" });
    return array;
  }
  ))
  .subscribe((data)=>{ this.bank=data });
  }


}
