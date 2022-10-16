const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const format = require("pg-format");
//
app.use(cors());
app.use(express.json());

//Rutas

//---Clientes
//Ver * clientes
app.get("/clientes", async (req, res) => {
  try {
    const allClientes = await pool.query("select * from taller.clientes");
    res.json(allClientes.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Crear un cliente--OK
app.post("/clientes", async (req, res) => {
  try {
    const {
      cedcliente,
      nomcliente,
      apecliente,
      dircliente,
      telcliente,
      mailcliente,
      ciucliente,
      feccliente,
    } = req.body;
    const nuevoCliente = await pool.query(
      "INSERT INTO taller.clientes (cedcliente,nomcliente,apecliente,dircliente,telcliente,mailcliente,ciucliente,feccliente) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        cedcliente,
        nomcliente,
        apecliente,
        dircliente,
        telcliente,
        mailcliente,
        ciucliente,
        feccliente,
      ]
    );
    res.json(nuevoCliente.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Ver un cliente--OK
app.get("/clientes/:ccliente", async (req, res) => {
  const { ccliente } = req.params;
  try {
    const cliente = await pool.query(
      "select * from taller.clientes where cedcliente=$1",
      [ccliente]
    );
    res.json(cliente.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Actualizar un cliente-OK
app.put("/clientes/:ccliente", async (req, res) => {
  try {
    const { ccliente } = req.params;
    const {
      nomcliente,
      apecliente,
      dircliente,
      telcliente,
      mailcliente,
      ciucliente,
      feccliente,
    } = req.body;
    await pool.query(
      "UPDATE taller.clientes SET nomcliente=$1,apecliente=$2,dircliente=$3,telcliente=$4,mailcliente=$5,ciucliente=$6,feccliente=$7 WHERE cedcliente=$8",
      [
        nomcliente,
        apecliente,
        dircliente,
        telcliente,
        mailcliente,
        ciucliente,
        feccliente,
        ccliente,
      ]
    );
    res.json("Cliente actualizado!");
  } catch (err) {
    console.error(err.message);
  }
});

//---Vehiculos
//Ver * vehiculos
app.get("/vehiculos", async (req, res) => {
  try {
    const allVehiculos = await pool.query("select * from taller.vehiculos");
    res.json(allVehiculos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Crear un vehiculo--OK
app.post("/vehiculos", async (req, res) => {
  try {
    const {
      plavehiculo,
      tipvehiculo,
      modvehiculo,
      colvehiculo,
      marvehiculo,
      obsvehiculo,
      cedcliente,
    } = req.body;
    const nuevoVehiculo = await pool.query(
      "INSERT INTO taller.vehiculos (plavehiculo,tipvehiculo,modvehiculo,colvehiculo,marvehiculo,obsvehiculo,cedcliente) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        plavehiculo,
        tipvehiculo,
        modvehiculo,
        colvehiculo,
        marvehiculo,
        obsvehiculo,
        cedcliente,
      ]
    );
    res.json(nuevoVehiculo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Ver un vehiculo--OK REVISAR WILDCARDS EN PLACA(APRENDER)
app.get("/vehiculos/:placa", async (req, res) => {
  const { placa } = req.params;
  try {
    const vehiculo = await pool.query(
      "SELECT * FROM taller.vehiculos WHERE plavehiculo LIKE upper($1)",
      ["%" + placa + "%"]
    );
    res.json(vehiculo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//actualizar un vehiculo--OK
app.put("/vehiculos/:placa", async (req, res) => {
  try {
    const { placa } = req.params;
    const {
      tipvehiculo,
      modvehiculo,
      colvehiculo,
      marvehiculo,
      obsvehiculo,
      cedcliente,
    } = req.body;
    await pool.query(
      "UPDATE taller.vehiculos SET tipvehiculo=$1,modvehiculo=$2,colvehiculo=$3,marvehiculo=$4,obsvehiculo=$5,cedcliente=$6 WHERE plavehiculo like upper($7)",
      [
        tipvehiculo,
        modvehiculo,
        colvehiculo,
        marvehiculo,
        obsvehiculo,
        cedcliente,
        placa,
      ]
    );
    res.json("Vehiculo actualizado!");
  } catch (err) {
    console.error(err.message);
  }
});

//Empleados
//Ver * empleados
app.get("/empleados", async (req, res) => {
  try {
    const allEmpleados = await pool.query("select * from taller.empleados");
    res.json(allEmpleados.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Crear un empleado
app.post("/empleados", async (req, res) => {
  try {
    const {
      cedempleado,
      nomempleado,
      apeempleado,
      dirempleado,
      telempleado,
      mailempleado,
      ciuempleado,
      fecempleado,
      espempleado,
      sueldoempleado,
    } = req.body;
    const nuevoEmpleado = await pool.query(
      "INSERT INTO taller.empleados(cedempleado,nomempleado,apeempleado,dirempleado,telempleado,mailempleado,ciuempleado,fecempleado,espempleado,sueldoempleado) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        cedempleado,
        nomempleado,
        apeempleado,
        dirempleado,
        telempleado,
        mailempleado,
        ciuempleado,
        fecempleado,
        espempleado,
        sueldoempleado,
      ]
    );
    res.json(nuevoEmpleado.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Ver un empleado
app.get("/empleados/:ccempleado", async (req, res) => {
  const { ccempleado } = req.params;
  try {
    const empleado = await pool.query(
      "SELECT * FROM taller.empleados where cedempleado = $1",
      [ccempleado]
    );
    res.json(empleado.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Actualizar un empleado
app.put("/empleados/:ccempleado", async (req, res) => {
  try {
    const { ccempleado } = req.params;
    const {
      nomempleado,
      apeempleado,
      dirempleado,
      telempleado,
      mailempleado,
      ciuempleado,
      fecempleado,
      espempleado,
      sueldoempleado,
    } = req.body;
    await pool.query(
      "UPDATE taller.empleados set nomempleado=$1,apeempleado=$2,dirempleado=$3,telempleado=$4,mailempleado=$5,ciuempleado=$6,fecempleado=$7,espempleado=$8,sueldoempleado=$9 WHERE cedempleado = $10 ",
      [
        nomempleado,
        apeempleado,
        dirempleado,
        telempleado,
        mailempleado,
        ciuempleado,
        fecempleado,
        espempleado,
        sueldoempleado,
        ccempleado,
      ]
    );
    res.json("Empleado actualizado!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(4200, () => {
  console.log("server corriendo en 4200");
});
