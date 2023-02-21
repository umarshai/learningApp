import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.css']
})
export class CssComponent {

  
  bank = '';
  type = "CSS";  
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
    array=array.filter((demo)=>{ return demo.type=="CSS" });
    return array;
  }
  ))
  .subscribe((data)=>{ this.bank=data });
  }


}
