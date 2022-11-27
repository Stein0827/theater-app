import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import axios from 'axios';

interface RequestBody {
    type: String;
    data: {
      id: String;
      content: String;
      postId: String;
    }
}

interface Data {
    id: String;
    content: String;
    postId: String;
    status: String;
}

interface NewEvent {
    type: String;
    data: Data;
}

const app: Express = express();

app.use(express.json());
app.use(cors());

let blacklist = new Set<String> (["fail","banana", "flowers", "love"]);

app.post('/events', async (req: Request, res: Response) => {
    
    const {type, data}: {type: String, data: Data} = req.body;

    console.log(req.body.type);
    // Listen for CommentCreated Events
    if (type === 'CommentCreated') {
        const {content}: {content: String} = data;

        // Scan comment and define status
        let statusStr: String = "accepted";
        content.split(/[,!?. ]+/).forEach( function(word: String) {
            if (blacklist.has(word)) {
                statusStr = "rejected";
            }
        });

        // Emit CommentModerated event to eventbus with status property
        let newEvent: NewEvent = {
            type: 'CommentModerated',
            data: {
                ... data,
                status: statusStr
            },
        }

        console.log(newEvent);

        await axios.post('http://eventbus:4005/events', newEvent);
    }
        
  res.send({});
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});