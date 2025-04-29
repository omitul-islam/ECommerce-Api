import app from './app.js'; 
import dotenv from 'dotenv';
import connectDb from './src/db/db.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});