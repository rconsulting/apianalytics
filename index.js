const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

//connectDB
connectDB();

//init middlware
app.use(express.json({ extended: false}));

//const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000': 'prod-url';

//app.use(cors({ origin }));
//comment for prod
// app.get('/', (req, res) => res.send('API Running'));
app.get('/', (req, res) => {
        res.json({endpoint: '/'})
})

app.get('/books', (req, res) => {
    res.json({endpoint: '/books'})
})

app.get('/toto', (req, res) => {
    res.json({endpoint: '/tooooooooo'})
})
//Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
 app.use('/api/pages', require('./routes/api/pages'))
app.use('/api/infowebsite', require('./routes/api/infowebsite'))
app.use('/api/messageprojects', require('./routes/api/messageprojects'))
app.use('/api/messages', require('./routes/api/messages'))

//Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     //Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


app.listen();