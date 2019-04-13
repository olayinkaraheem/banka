import express from 'express';
import UserRoutes from './routes/user.route';
import AccountRoutes from './routes/account.route';
import TransactionRoutes from './routes/transactions.route';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.json());

app.use('/api/v1/auth', UserRoutes);
app.use('/api/v1/', AccountRoutes);
app.use('/api/v1/transaction', TransactionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome');
});
const PORT = 8080;
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on port ${PORT}`);
});
