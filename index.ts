import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';



(async () => {
    const app = express();

    const port = process.env.PORT || 8080; // default port to listen
  
    app.use(bodyParser.json());

    app.get( "/getword/", ( req: Request, res: Response ) => {
        res.status(200).send("Welcome to the GetWord!");
    })

   const dictAPI = async (word:string) => {
        try{
            const response: any = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.data[0].meanings[0].definitions;        
        }
        catch(err: any){
            return err;
        }
    }

    // Get words by a specific phrase to demonstrate req.params
    // > try it {{host}}/words/:the_phrase
    app.get( "/getword/:phrase", async ( req: Request, res: Response ) => {
        const { phrase } = req.params;
        const result = await dictAPI(phrase);

        res.status(200).json({'Result': result});
	
    });
  

    // Start the Server
    app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
    });
})();
