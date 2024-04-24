const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

var con = mysql.createConnection({
  host: "localhost",
  user: "bikeShopUser",
  password: "EnergyStarMySQL",
  database: "bikeshop",
});

app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
con.connect(function (err) {
  if (err) throw err;
  console.log("Conexión a la base de datos establecida");
});

app.post("/pruebas", (req, res) => {
  const text = req.body.text;
  const number = req.body.number;
  console.log(text, number);

  con.query(
    `INSERT INTO pruebas (text, number) VALUES (?,?)`,
    [text, number],
    function (err, results, fields) {
      if (err) throw err;
      console.log(results);
      res.send("datos recibidos correctamente.");
    }
  );
});

app.get("/data", (req, res) => {
  con.query("SELECT BikeID, Name, Model, Brand, Image, Type, PowerHP, EngineCC, DryWeight FROM bikedata", function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get("/get-bike/:id", (req, res) => {
  let query = "SELECT * FROM bikedata WHERE BikeID = ?"
  let id = req.params.id;
  con.query(query, id, function(err, results, fields){
    if (err) throw err;
    console.log(results);
    res.send(results);
  })
})

app.get("/get-data/:type/:filter", (req, res) => {
  let query = "SELECT BikeID, Name, Model, Brand, Image, Type, PowerHP, EngineCC, DryWeight FROM bikedata WHERE " + req.params.filter + " = ?";
  let type = req.params.type;
  con.query(query, type, function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get("/get-by-cost/:max/:min", (req, res) => {
  let query = "SELECT BikeID, Name, Model, Brand, Image, Type, PowerHP, EngineCC, DryWeight FROM bikedata WHERE Cost BETWEEN ? AND ?";
  let values = [req.params.min, req.params.max];
  con.query(query, values, function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("servidor iniciado");
});

// Datos para la inserción
// var bikeData = [
//   'R1M', 'Yamaha', 27399, 'R1M.png', 'SuperSport', 998, 200, 147.1, 13500, 113.3, 11500, 202, 180,
//   'liquid-cooled inline 4 cylinder DOHC 4-valves per cylinder', 13.0, 80.9, 27.2, 45.9, 33.9,
//   '6-speed wet multiplate assist and slipper clutch', 'Fuel injection with YCC-T and YCC-I',
//   4.5, '43mm Öhlins Electronic Racing Suspension NPX fork fully adjustable 4.7-in travel',
//   'Öhlins Electronic Racing Suspension single shock fully adjustable 4.7-in travel',
//   'Dual 320mm hydraulic disc Brake Control System and ABS',
//   '220mm hydraulic disc Brake Control System and ABS',
//   '120/70ZR17 Bridgestone BATTLAX RACING STREET RS11F',
//   '200/55ZR17 Bridgestone BATTLAX RACING STREET RS11R',
//   55.3, 'The YZF R1M is a new Super Sport from Yamaha comes in 1 variants. The top variant of YZF R1M is powered by the Standard a 998cc 4 cylinder Gasoline engine that fires 197 hp of power and 113.3 Nm torque.'
// ];

// var sql = `INSERT INTO bikedata (Name, Brand, Price, Image, Type, EngineCC, PowerHP, PowerKW, EngineMaxHpRPM, Torque, EngineMaxNmRPM, WetWeight, DryWeight, EngineQuickDesc, CompressionRatio, BikeLong, BikeWidth, BikeHeight, SeatHeight, Transmission, FuelDelivery, FuelCapacity, SuspensionFront, SuspensionRear, BrakesFront, BrakesRear, TiresFront, TiresRear, Wheelbase, BikeDesc)
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

// con.query(sql, bikeData, function (err, result, fields) {
//   if(err) throw err;
//   console.log("Datos insertados correctamente");
// });
