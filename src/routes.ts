import { Express } from 'express';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World');
  });
};

export default routes;
