import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor( private service:ApiserviceService) { }
  
  readData:any;
  successmsg:any;

  ngOnInit(): void {
  this.getAllData();
 
  }
 
  //get deleteid
   deleteID(idempleado:any)
   {
     console.log(idempleado,'deleteid==>');
     this.service.deleteData(idempleado).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res.message;
      this.getAllData();


     });

   }
//get data
   getAllData()
   {
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
      });
   }

}
 