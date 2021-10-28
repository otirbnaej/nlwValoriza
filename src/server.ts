import express from 'express';

const app = express();

app.get('teste', (req, res) => {
	console.log('teste');
});

app.listen(3000, () => console.log('Server is running'));
