const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(cors());
app.use(bodyparser.json());

// database conexion

const db = mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'apislide',
port:3306

});

//checkdatabse conexion
db.connect(err=>{
    if(err) {console.log(err, 'dberr');}
    console.log('conectando base de datos..');
})

//get all data

app.get('/empleado',(req,res)=>{
    
    let qr = `select * from empleado`;
    db.query(qr,(err,result)=>{

         if(err)
         {
             console.log(err,'errs');
         }
         if(result.length>0)
         {
             res.send({
                 message:'all empleado data',
                 data:result

             });
         }

    });
});


//get single 
app.get('/empleado/:idempleado',(req,res)=>{
    let gID = req.params.idempleado;

    let qr = `select * from empleado where idempleado = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
           res.send({
               message:'data not found'
           });
        }
    });

});


//create data
app.post('/empleado',(req,res)=>{
    
    console.log(req.body,'createdata');

    let Nombre = req.body.nombre;
    let Email = req.body.email;
    let Puesto = req.body.puesto;
    let FechaNacimiento = req.body.fechanacimiento;
    let Domicilio = req.body.domicilio;

    let qr = `insert into empleado(nombre,email,puesto,fechanacimiento,domicilio) 
    values('${Nombre}','${Email}','${Puesto}','${FechaNacimiento}','${Domicilio}')`;
     
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        
        if(err){
            console.log(err);
            res.send({message:'Error al registrar el empleado'});
        }else{
            console.log(result,'result');
            res.send({message:'Empleado agregado correctamente'});
        }


    });

});

//update data
app.put('/empleado/:idempleado',(req,res)=>{

    console.log(req.body,'updatedata');

    let gID = req.params.idempleado;

    let Nombre = req.body.nombre;
    let Email = req.body.email;
    let Puesto = req.body.puesto;
    let FechaNacimiento = req.body.fechanacimiento;
    let Domicilio = req.body.domicilio;

    let qr = `update empleado set nombre = '${Nombre}', email = '${Email}', puesto = '${Puesto}', fechanacimiento = '${FechaNacimiento}', domicilio = '${Domicilio}'
    where idempleado = ${gID}`;

    db.query(qr,(err,result)=>{
    
        if(err){console.log(err);}

        res.send({
            message:'Datos actualizados'
        });
    });

});

//delete 

app.delete('/empleado/:idempleado',(req,res)=>{
    let qID = req.params.idempleado;

    let qr = `delete from empleado where idempleado = '${qID}' `;
    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}

        res.send(
            {
                message:'Empleado eliminado'
            }
        )

    });

});








app.listen(3000,()=>{
    console.log('server running..');
});


