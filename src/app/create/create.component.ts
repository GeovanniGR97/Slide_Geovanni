import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserviceService} from '../apiservice.service';
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor( private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamidempleado:any;

  ngOnInit(): void {
    this.getparamidempleado = this.router.snapshot.paramMap.get('idempleado');
    if(this.getparamidempleado)
    {
      this.service.getSingleData(this.getparamidempleado).subscribe((res)=>{
        console.log(res,'res==>');
        this.empleadoForm.patchValue({
        nombre:res.data[0].nombre,
        email:res.data[0].email,
        puesto:res.data[0].puesto,
        fechanacimiento:res.data[0].fechanacimiento,
        domicilio:res.data[0].domicilio  
        });
  
      });
    }

    
  }
  empleadoForm = new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'puesto':new FormControl('',Validators.required),
    'fechanacimiento':new FormControl('',Validators.required),
    'domicilio':new FormControl('',Validators.required)

  });

  //createnewempleado
  
  empleadoSubmit()
  {
    if(this.empleadoForm.valid)
    {
      console.log(this.empleadoForm.value)
      this.service.createData(this.empleadoForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.empleadoForm.reset();
        this.successmsg = res.message;
      });
    }
    else
    {
      this.errormsg = 'Los campos son requeridos';
    }
  }

  //updatedata
  empleadoUpdate()
  {
   console.log(this.empleadoForm.value,'updatedform');     

   if(this.empleadoForm.valid)
   {
   this.service.updateData(this.empleadoForm.value,this.getparamidempleado).subscribe((res)=>{
     console.log(res,'resupdate');
     this.successmsg = res.message;
   });
   }else
   {
   this.errormsg = 'Todos los campos son obligatorios';
   }
  }

}
