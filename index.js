const express = require('express');
const mysql = require('mysql2');
const bp = require('body-parser');

const app = express();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hr'
});
app.use(bp.urlencoded({extended: true}))

app.post('/employees', function (req, res) {

    let jobId = req.body.jobId;
    let jobTitle = req.body.jobTitle;
    let minSalary = req.body.minSalary;
    let maxSalary = req.body.maxSalary;

    let parametros = {
        job_id: jobId,
        job_title: jobTitle,
        min_salary: minSalary,
        max_salary: maxSalary
    };

    let query = "INSERT INTO jobs SET ?";

    conn.query(query, parametros, function (err, result) {
        if (err) throw err;

        conn.query("SELECT * FROM jobs", function (err, results) {
            res.json(results);
        });
    });
});

/*
conn.connect(function (err) {
    if (err) throw err;
    console.log("Conexión exitosa a base de datos");
});*/


app.get("/employees", function (req, res) {

    conn.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        res.json(results);
    });

});

app.get("/jobs", function (req, res) {

    conn.query("SELECT * FROM jobs", function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            results[i].orden = i + 1;
        }
        res.json(results);
    });

});

app.get("/employees/:id", function (req, res) {

    let employeeId = req.params.id;

    let sql = "SELECT * FROM employees WHERE employee_id = ?";

    let params = [employeeId];

    conn.query(sql, params, function (err, results) {
        if (err) throw err;
        res.json(results);
    });

});


app.post('/', function (req, res) {
    let nombreUsuario = req.body.nombre;
    let apellidoUsuario = req.body.apellido;
    let returnData = {
        data: {
            nombre: nombreUsuario,
            apellido: apellidoUsuario
        }
    };
    res.json(returnData);
});


app.listen(3000, function () {
    console.log("Servidor corriendo en el puerto 3000");
});




