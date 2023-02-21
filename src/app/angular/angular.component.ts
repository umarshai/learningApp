import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import data from '../data/angular.json'
import { DbService } from '../service/db.service';
@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent {
  bank = '';
  type = "Angular";  
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
    array=array.filter((demo)=>{ return demo.type=="Angular" });
    return array;
  }
  ))
  .subscribe((data)=>{ this.bank=data });
  }
}
