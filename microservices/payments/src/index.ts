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

app.post('/api/v1/payment', async (req: Request, res: Response) => {
    res.send({});
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});