const moment = require("moment");

const calcularPromise = (data, arrayDays, hour) => {
  return {
    packPromise: calcular(data.packPromise, arrayDays, hour),
    shipPromise: calcular(data.shipPromise, arrayDays, hour),
    deliveryPromise: calcular(data.deliveryPromise, arrayDays, hour),
    readyPickUpPromise: calcular(data.readyPickUpPromise, arrayDays, hour),
  };
};

const calcular = (valr, arrayDays, hour) => {
  let min = null;
  let max = null;
  if (valr.min.type === "NULL") {
    min = "NULL";
  } else if (valr.min.type === "DELTA-HOURS") {
    let hora = parseInt(hour) + parseInt(valr.min.deltaHours);
    min = hora + ":00";
  } else if (valr.min.type === "DELTA-BUSINESSDAYS") {
    let restar = 1;
    if (valr.min.deltaBusinessDays === 0) {
      restar = 0;
    }
    let hora = `${arrayDays[valr.min.deltaBusinessDays - restar]} ${
      valr.min.timeOfDay
    }+:00`;
    min = moment(hora).subtract(4, 'hours');
  }

  if (valr.max.type === "NULL") {
    max = "NULL";
  } else if (valr.max.type === "DELTA-HOURS") {
    let hora = parseInt(hour) + parseInt(valr.max.deltaHours);
    max = hora + ":00";
  } else if (valr.max.type === "DELTA-BUSINESSDAYS") {
    let restar = 1;
    if (valr.max.deltaBusinessDays === 0) {
      restar = 0;
    }
    let hora = `${arrayDays[valr.max.deltaBusinessDays - restar]} :${
      valr.max.timeOfDay + ":00"
    }`;
    max = moment(hora).subtract(4, 'hours');
  }

  return {
    min,
    max,
  };
};

module.exports = calcularPromise;
// 2021-03-20 18
