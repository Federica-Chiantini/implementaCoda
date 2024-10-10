import { IPersona } from "./persona.model";

export const errors = (body : IPersona, Persone : IPersona[]) => {
    if (!body) {
        throw new Error("Dati non validi")
    }

    if (!body.nome || body.nome.length < 4) {
        throw new Error("Il campo nome deve contenere almeno 4 caratteri")
    }

    if (!body.cognome || body.cognome.length < 3) {
        throw new Error("Il campo cognome deve contenere almeno 3 caratteri")
      }

      const campiValidi = ['nome', 'cognome']
      for(const c in body){
        if(!campiValidi.includes(c)){
            throw new Error(`Il campo '${c}' non e' ammesso, sono ammessi sono Nome e Cognome`)
        }
      }

    let doppione = Persone.filter( x => x.nome === body.nome && x.cognome === body.cognome )
    if(doppione.length > 0){
        throw new Error("Persona gia' aggiunta alla coda") 
    }
};

export function shuffle<IPersona>(array: IPersona[]): IPersona[] {
    let currentIndex = array.length,  randomIndex; 
    while (currentIndex != 0) {
  
      // Cerca un elemento che rimane nella lista 
      randomIndex = Math.floor(Math.random() * currentIndex); 
      currentIndex--; 
  
      // sostituiscivlo con l'elemento corrente
      [array[currentIndex], array[randomIndex]] = [ 
        array[randomIndex], array[currentIndex]]; 
    }
  
    return array; 
};
