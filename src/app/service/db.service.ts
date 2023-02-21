import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor( private http: HttpClient) {

  }
  addNew(data:any){
    return this.http.post('https://lapp-29b58-default-rtdb.firebaseio.com/posts.json',data);
  }
  getData(){
    return this.http.get('https://lapp-29b58-default-rtdb.firebaseio.com/posts.json');
  }
  deleteData(id){
    return this.http.delete('https://lapp-29b58-default-rtdb.firebaseio.com/posts/'+id+'.json');
  }
  updateData(id,data){
    return this.http.put('https://lapp-29b58-default-rtdb.firebaseio.com/posts/'+id+'.json',data);
  }
}
