const express = require('express');
const bodyParser = require('body-parser');
const pc = require('./controllers/posts_controller.js')


const app = express();
app.use( bodyParser.json() );

app.get('/api/posts', pc.read);
app.post('/api/posts', pc.create);
app.put('/api/posts/:id', pc.update);
app.delete('/api/posts/:id', pc.delete);

// axios.get('/api.openweathermap.org/data/2.5/weather?q={provo')
//    .then((response) => {

// }) 

const port = 5000;
app.listen(port, () => {console.log(`Server is running on port ${port}.`);})
