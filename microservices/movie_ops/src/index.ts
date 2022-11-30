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

app.post('/api/v1/operations', async (req: Request, res: Response) => {
    res.send({});
});

app.put('/api/v1/operations', async (req: Request, res: Response) => {
    res.send({});
});

app.get('/api/v1/operations', async (req: Request, res: Response) => {
    res.send({});
});

app.delete('/api/v1/operations', async (req: Request, res: Response) => {
    res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});