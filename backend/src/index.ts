import express from 'express';
import { Request, Response } from 'express';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const app = express();
const PORT = 8080;

const users: IUser[] = [];

app.get('/users', async (request, response) => {
  if (request.url === "/users") {
    response.end(
      JSON.stringify({
        users,
        AmountOfUsers: users.length
      })
    );
  }
});

app.post('/users', async (request: Request, response: Response): Promise<void> => {
  const { name, email, password } = request.body;

  if (request.url === "/users") {
    if (!name || !email || !password) {
      response
        .status(401)
        .end(JSON.stringify({ messsage: 'Please fill all fields' }));
    }

    users.push({ name, email, password });

    response
      .status(201)
      .end(JSON.stringify({ message: 'User created successfully' }));  
  }
});


app
  .listen(PORT)
  .on('listening', () => {
  console.log(`Port listening on port ${PORT}`)
});

