const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const db = require("./StorageDb");
const calcularPromise = require("./calular");

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

app.post("/list_ordenid", async (req, res) => {
  //   console.log(req.body);
  let result = db.get(req.body.product);

  const data = await result.filter((r) => r.id === req.body.id);

  return res.status(200).json(data);
});

app.post("/shipping-methods", async (req, res) => {
  let returnResult = {
    pack_promise_min: null,
    pack_promise_max: null,
    ship_promise_min: null,
    ship_promise_max: null,
    delivery_promise_min: null,
    delivery_promise_max: null,
    ready_pickup_promise_min: null,
    ready_pickup_promise_max: null,
    msg: "",
  };
  let date = moment();

  const resquest = req.body;
  let currentDay = date.format("YYYY-MM-DD");
  let hour = moment().format("H");
  //###  QUERY SHIPPING METHOD
  const queryShippingMethod = await shippingMethod(resquest.method);
  const resQuery = queryShippingMethod.data;
  //###  QUERY GETOFFDAY
  const queryGetOffDay = await getOffDay();
  const resQuerygetOffDay = queryGetOffDay.data;

  let nextBusinessDays = [];
  for (let index = 0; nextBusinessDays.length < 10; index++) {
    let d = date.add(1, "days");
    d = d.format("YYYY-MM-DD");
    let existe = false;
    resQuerygetOffDay.forEach((element) => {
      if (d === element) {
        existe = true;
      }
    });
    if (!existe) {
      // se va almacenando en el array resQueryGetOffDay
      nextBusinessDays.push(d);
    }
  }

  //   ### RULES.AVAILABILITY.BYWEIGHT
  let rules_byWeight = resQuery.rules.availability.byWeight;
  //   VALIDATE BYWEIGHT.MIN
  let rules_byRequestTime = {};
  resquest.lineItems.forEach((element) => {
    if (
      rules_byWeight.min <= element.productWeight &&
      element.productWeight <= rules_byWeight.max
    ) {
      rules_byRequestTime = resQuery.rules.availability.byRequestTime;
    } else {
      returnResult.msg = "Peso no permitido";
      return res.status(200).json(returnResult);
    }
  });

  //   VALIDATE BYREQUESTTIME DAYTYPE
  let dateValidate = false;
  if (rules_byRequestTime.dayType === "BUSINESS") {
    resQuerygetOffDay.forEach((element) => {
      if (currentDay === element) {
        dateValidate = true;
      }
    });
  }
  if (dateValidate) {
    returnResult.msg = "Dia no habil";
    return res.status(200).json(returnResult);
  }

  //   VALIDATE FROMTIMEOFDAY - TOTIMEOFDAY
  let promiseParams = {};

  if (
    rules_byRequestTime.fromTimeOfDay <= hour &&
    hour <= rules_byRequestTime.toTimeOfDay
  ) {
    promiseParams = resQuery.rules.promisesParameters.cases[0];
  } else {
    returnResult.msg = "Hora no disponible";
    return res.status(200).json(returnResult);
  }

  priority = 1;
  let caseCondition = {};
  if (priority === promiseParams.priority) {
    caseCondition = promiseParams.condition.byRequestTime;
  } else {
    return res.status(200).json(returnResult);
  }

  let dataRes = calcularPromise(promiseParams, nextBusinessDays, hour);

  //   return res.status(200).json(dataRes);

  //   if (
  //     caseCondition.fromTimeOfDay <= hour &&
  //     hour <= caseCondition.toTimeOfDay
  //   ) {
  //     packPromise = promiseParams.packPromise;
  //   }

  returnResult.delivery_promise_max = dataRes.deliveryPromise.max;
  returnResult.delivery_promise_min = dataRes.deliveryPromise.min;
  returnResult.pack_promise_max = dataRes.packPromise.max;
  returnResult.pack_promise_min = dataRes.packPromise.min;
  returnResult.ready_pickup_promise_max = dataRes.readyPickUpPromise.max;
  returnResult.ready_pickup_promise_min = dataRes.readyPickUpPromise.min;
  returnResult.ship_promise_max = dataRes.shipPromise.max;
  returnResult.ship_promise_min = dataRes.shipPromise.min;

  try {
    resquest.id =
      "MSE-" + date.valueOf() + "-" + (Math.floor(Math.random() * 100) + 1);
    resquest.creationDate = currentDay;
    resquest.creationHour = date.format("H:mm:ss");
    resquest.description = resQuery.description;
    resquest.promise = returnResult;
    db.set("product", resquest);
    // return res.status(200).json(false);
    return res.status(200).json({
      status: "Ok",
      res: db.getAll(),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(5000, () => {
  console.log("Server on port 5000");
});
