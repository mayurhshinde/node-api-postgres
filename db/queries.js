const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TestDB',
  password: 'xFMsrMEpwJzjSW4FarSp',
  port: 5432,
})

const getEmployee = (request, response) => {
    pool.query('SELECT * FROM employee where isactive=true ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('select id,firstname,lastname,address,email,isactive,to_char(dob, \'YYYY-MM-DD\') as dob  from Employee WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results); 
      response.status(200).json(results.rows)
    })
  }
  
  const createEmployee = (request, response) => {
      console.log(request.body);
    const { firstname , lastname , email , address , dob } = request.body
  
    pool.query('INSERT INTO employee (firstname , lastname , email , address , dob) VALUES ($1, $2, $3, $4, $5 ::date)', [firstname , lastname , email , address , dob], (error, results) => {
      if (error) {
        throw error
      } 
      response.status(201).send(`Employee added`)
    })
  }
  
  const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstname , lastname , email , address , dob } = request.body
  
    pool.query(
      'UPDATE employee SET firstname = $1, lastname = $2, email = $3, address = $4, dob = $5 WHERE id = $6',
      [firstname , lastname , email , address , dob, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`employee modified with ID: ${id}`)
      }
    )
  }
  
  const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('UPDATE employee SET isactive=false WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`employee deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }