import { Component } from '@angular/core';
import { DbService } from '../service/db.service';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent {
  bank = '';
  type = "Angular";  
  route = 'home'
  constructor( private dbService:DbService,private router: ActivatedRoute) {
    this.router.url.subscribe( (r)=> {
      this.route = r[0].path;
      this.type = this.route;
      this.getNew(this.route);
      });
  }
  cchange(value)
  {
    setTimeout(() => {
      this.getNew(this.route);
    }, 300)   
  }
  getNew(route: string){ 
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
    array=array.filter((demo)=>{ return demo.type== route });
    return array;
  }
  ))
  .subscribe((data)=>{ this.bank=data });
  }
}
