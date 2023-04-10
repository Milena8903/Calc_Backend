//1. Crear un objeto express - Representa la biblioteca
const express = require('express');

//2. Crear un objeto que representa nuestra aplicaciónn
//objeto q se crea cuando se instancia la biblioreca
//representa una aplicación apartir de esa biblioteca
const app = express();
//se le dice en que tipo de formato estan los datos qe esta recibiendo
//entonces se le esta diciendo que use el formato json 
app.use(express.json());

//Manera larga
//la respuesta va a tomar la peticion, y va a tener un callbacl
//q va a representar quien llamo a esa funcion
//next: por cada ruta va a llamar a tos los use, q se verifica ejecuta 
//antes del callback
//resperencia a cada funcion, haga esto y continue
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); //permition que pueda tener una peticion desde los siguientes origenes
    //regla de acceso q permita ciertos origenes
    //debe corresponder a la urla q le quiera dar permiso
    //a la respuesta agreguele este encabezado
    res.header("Access-Control-Allow-Methods", "POST");
    //q tipo de encabezados quiero aceptar
    //limita la cantidad de procesamientos de encabezados q quiero
    res.header("Access-Control-Allow-Headers", "Content-type");
    next();//despues de q procese el encavezado siga generando la respuesta
}
);







//Definir los entry point (puntos de entreda) de al API
//Definir las ruta( la url) en donde va a responder nuestra api
//Depndiendo de las funcionalidades, el diseño de la aplicación
//Nuestras aplicaciones responden a peticiones que se hacen desde el navegador web
//le digo q tipo de método quiero utilizar
//express llame a la petición post porque voy a crear una ruta q va a procesar
//peticiones por ese método
//el servidor esta escuchando en http://localhost:3000/ruta
/*
app.post(
    //ruto q va a tener para responder a las peticiones
    '/sumar',
    //se ejecuta la función de callback
    //Se requieren dos objetos: uno reprsentan la petición
    //un nobjeto representando la respuesta
    (req, res )=>{
        //To Do: Aqui va el procesamiento de la petición a esta ruta
        console.log("Alguien esta conectandose a esta ruta!! ");
        //la mayoria de las veces se responde en formato json 
        res.json("Hola sumar ");
    }
);
*/

app.post(
    '/api/sumar',
    (req, res )=>{
        console.log("alguien está conectándose a esta ruta!!!");
        const {numero_1, numero_2} = req.body;
        const resultado = parseFloat(numero_1) + parseFloat(numero_2);
        res.json(resultado);
    }
);

app.post(
    '/restar',
    (req, res)=>{
        //console.log("Alguien esta conectandose a esta ruta restar ");
        //desestructurar lo que me estan pidiendo
        //console.log(req.body.numero_2);

        //manera larga: definir la constante
        //const n1 = req.body.numero_1;
        //const n2 = req.body.numero_2;
        //const resultado = n1-n2;
        
        //manera corta, por la decostrucción de objetos
        //debe llamarse tal cuel esta en el cuerpo 
        const {numero_1, numero_2} = req.body;
        const resultado = numero_1 - numero_2;
        res.json(resultado);
        //Generalm. eso no se hace en la api si no se llama a un elemento
        //del backend y hace todo eso

        //res.json("Hola restar");
        //responde lo que esta en el cuerpo de la peticion
        //res.json(req.body);
    }
);

//Como queda la ruta para dividir
app.post(
    '/api/dividir',
    (req, res)=>{

        /* Una forma
        const {numero_1, numero_2} = req.body;
        let resultado;
        if(numero_2 != 0){
            resultado = numero_1 / numero_2;
        }else{
            resultado = "error";
        }
        */

        //Otra forma
        let resultado;
        try {
            const {numero_1, numero_2} = req.body;
            resultado = numero_1 / numero_2;
        } catch (error) {
            //gestionar el error
            resultado = "error";
        }

        res.json(resultado);
    }
);


//3. Crear un servicio para escuchar peticiones
//crear un servicio para escuchar, generalmente se hace de ultimas
//metodo para escuchar peticioes
app.listen(
    //puerto en el q quiero escuchar las peticiones, generalm. es el puerto 3000
    3000,
    //función de callbak, si todo sale bien va a ejecutar:
    ()=>{
        console.log("Servidor ejecutandose en el puerto 3000");
    }
);
