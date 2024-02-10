import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import boardsRouter from './routes/boardsRoute';
import eventsRouter from './routes/eventsRoute';
import userRouter from './routes/userRoute';

const PORT = process.env.PORT || 4242;

const app = express();

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// end middleware

app.use('/boards', boardsRouter);
app.use('/events', eventsRouter);
app.use('/users', userRouter);

app.use(function ({
    err,
    res,
}) {
    if (err) console.error(err?.stack);

    res.status(500).send('Something is broken.');
});

app.use(function ({ res }) {
    res.status(404).send('Sorry we could not find that.');
});

app.listen(PORT, function () {
    console.info(`Server is running on: ${PORT}`);
});
