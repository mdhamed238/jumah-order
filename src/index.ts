import app from './server';

const port = process.env.PORT || 4545;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

