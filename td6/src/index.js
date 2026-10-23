import express from 'express';

const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    res.send('Hello from outside and inside!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
