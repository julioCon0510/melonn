const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const db = require("./StorageDb");
// const add = require("./addProduct");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

const API_KEY = "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT";

const getOffDay = async () => {
  return await axios.get(
    "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
};

const shippingMethod = async (id) => {
  return await axios.get(
    `https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${id}`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
};

// rutas
app.get("/shipping-methods", async (req, res) => {
  const data = await axios.get(
    "https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods",
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  return res.status(200).json(data.data);
});

app.get("/list_orden", async (req, res) => {
  return res.status(200).json(db.getAll());
});

app.post("/shipping-methods", async (req, res) => {
  const resquest = req.body;
  // ->GET DATE NOW -creation date - the current datetime
  let date = moment();
  // INTERNAL ORDER NUMBER:
  let orderNumber =
    "MSE-" + date.valueOf() + "-" + (Math.floor(Math.random() * 100) + 1);
  resquest.id = orderNumber;
  try {
    db.set("product", resquest);
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// app.post("/shipping-methods", async (req, res) => {
//   let returnResult = {
//     pack_promise_min: null,
//     pack_promise_max: null,
//     ship_promise_min: null,
//     ship_promise_min: null,
//     delivery_promise_min: null,
//     delivery_promise_max: null,
//     ready_pickup_promise_min: null,
//     ready_pickup_promise_max: null,
//   };
//   const resquest = req.body;
//   // ->GET DATE NOW -creation date - the current datetime
//   let date = moment();

//   // INTERNAL ORDER NUMBER:
//   let orderNumber =
//     100 + date.valueOf() + (Math.floor(Math.random() * 100) + 1);

//   // DETERMINE now_datetime is business day
//   let listDayBusinness = [];
//   const queryGetOffDay = await getOffDay();
//   for (let index = 0; listDayBusinness.length < 10; index++) {
//     let d = date.add(1, "days");
//     d = d.format("YYYY-MM-DD");
//     let existe = false;
//     queryGetOffDay.data.forEach((element) => {
//       if (d === element) {
//         existe = true;
//       }
//     });
//     if (!existe) {
//       // se va almacenando en el array resQueryGetOffDay
//       listDayBusinness.push(d);
//     }
//   }

//   //###  QUERY SHIPPING METHOD
//   const queryShippingMethod = await shippingMethod(resquest.method);
//   let rules = queryShippingMethod.data.rules;

//   //###   VALIDATE MIN,MAX WEIGHT
//   let byWeight = rules.availability.byWeight;
//   let product = resquest.lineItems;
//   let byResquesTime = {};

//   product.forEach((e) => {
//     if (e.productWeight >= byWeight.min && e.productWeight <= byWeight.max) {
//       // si pasa la validacion del min y max Weight se asigna el valor rules.availability.byResquesTime.dayType
//       byResquesTime = rules.availability.byRequestTime;
//     } else {
//       return res.status(200).json(returnResult);
//     }
//   });

//   //   ### VALIDATE RULES BYRESQUESTIME
//   let currentDay = date.format("YYYY-MM-DD");
//   let fechaExiste = false;
//   if (byResquesTime.dayType === "BUSINESS") {
//     queryGetOffDay.data.forEach((element) => {
//       if (currentDay === element) {
//         fechaExiste = true;
//       }
//     });
//   }

//   if (fechaExiste) {
//     return res.status(200).json(returnResult);
//   }
//   //   ### VALIDATE HOURS

//   let hour = moment().format("H");
//   //   let hour = 10;

//   let rulesPromise = null;

//   if (
//     byResquesTime.fromTimeOfDay <= hour &&
//     hour <= byResquesTime.toTimeOfDay
//   ) {
//     //   } si pasa la validacion de la de la hora se le asiga el rules.promisesParameters.cases;
//     rulesPromise = rules.promisesParameters.cases;
//   }

//   //   if (rulesPromise[0].priority !== 1) {
//   //     return res.status(200).json(returnResult);
//   //   }
//   //   //   ### VALIDATE CASE BYRESQUESTIME
//   //   fechaExiste = false;
//   //   if (rulesPromise[0].condition.byRequestTime.dayType === "BUSINESS") {
//   //     queryGetOffDay.data.forEach((element) => {
//   //       if (currentDay === element) {
//   //         fechaExiste = true;
//   //       }
//   //     });
//   //   }

//   //   let PackMin = null;
//   //   let PackMax = null;
//   //   if (
//   //     rulesPromise[0].condition.byRequestTime.fromTimeOfDay <=
//   //     hour <=
//   //     rulesPromise[0].condition.byRequestTime.fromTimeOfDay.toTimeOfDay
//   //   ) {
//   //     PackMin = rulesPromise[0].packPromise;
//   //     PackMax = rulesPromise[0].packPromise.max.type;
//   //   }

//   db.set(orderNumber, resquest);
// });

app.listen(5000, () => {
  console.log("Server on port 5000");
});
