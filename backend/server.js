const express = require('express');
const cors = require('cors');
const route = require('./routes/route');


const app = express();
app.use(cors());

app.use('/api/books', route.books);
app.use('/api/authors', route.authors);
app.use('/api/wishlists', route.wishlists);
app.use('/api/users', route.users);
app.use('/api/signin', route.signin);
app.use('/api/signup', route.signup);
app.use('/api/mngsettings', route.mngsettings);
app.use('/api/payment', route.payment);
app.use('/api/shipaddress', route.shipaddress);

app.get('/api', (req, res) => {
    res.send('Wecome to RestAPI example!');
});


app.listen(4000, () => {
    console.log('RestAPI server listening on port 4000');
});
