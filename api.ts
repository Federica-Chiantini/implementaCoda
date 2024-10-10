import express, { Request, Response } from "express";
import bodyParser, { BodyParser } from "body-parser"; 
import { persone } from "./persona.array";
import { errors, shuffle } from "./array_utilities";

const app = express() 

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('api in ascolto')
})

//aggiunge una persona in coda
app.post("/add", (req, res) =>{
    if (persone.length >= 10) {
        res.status(400).send({ error: "nessun posto disponibile in coda" });
        return;
    }

    try{
        errors(req.body, persone)
        res.send("ok")
    }
    catch(e : any){
        res.status(400).send({ error: e.message })
    }

    persone.push(req.body); // Aggiungi solo se i dati sono validi
    res.send("ok");
})

//rimuove prima persona dalla coda
app.delete("/serve", (req, res) =>{
    if(persone.length === 0){
        res.status(400).send({ error: "nessuna persona presente in coda" });
        return;
    }

    persone.shift()
    console.log(persone.length)

    res.send("ok")
})

//contiene l'elenco delle persone
app.get("/queue", (req, res) =>{
    try{    res.send({
        list: persone,
    })}
    catch(e : any){
        res.status(400).send({ error: e.message })
    }
})

//rimuove una persona in coda
app.delete("/serve/:id", (req, res) =>{
    const id = req.params.id
    const numero = parseInt(id)

    if(isNaN(numero)){
        res.status(400).send({ error: "ID non valido" });
        return;
    }
    
    if(persone.length < numero){
        res.status(400).send({error: `${numero} e' errato`})
        return
    }

    persone.splice(numero, 1)
    console.log(persone.length)

    res.send("ok")
})

//ritorna il JSON con le due proprieta'
app.get("/list", (req, res) =>{
    res.json({
        number: persone.length,
        list: persone,
    })
})

//conta le persone in coda
app.get("/count", (req, res) =>{
    res.send({
        persone_in_lista: persone.length
    })
})

//FACOLTATIVI
//mescola le persone in coda -- cerca una soluzione pronta su internet
app.get("/shuffle", (req, res) =>{

    try{
        shuffle(persone)
    }
    catch{
        res.status(400).send({ error: "operazione non riuscita" })
    }

    res.send({
        nuova_lista: persone
    })
})

//chiude lo sportello e mostra un array con le persone che non sono state servite
app.get("/close", (req, res) =>{
    let chiudiCoda : boolean = true

    res.send({
        chiudiCoda : true,
        persone_In_Coda: persone.length,
        messaggio : `Sportello chiuso, non sono state servite ${persone.length} persone`
    })
})