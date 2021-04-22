const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3002
const db = require('../db/queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
// })
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.get('/employee', db.getEmployee)
app.get('/employee/:id', db.getEmployeeById)
app.post('/employee', db.createEmployee)
app.put('/employee/:id', db.updateEmployee)
app.delete('/employee/:id', db.deleteEmployee)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

