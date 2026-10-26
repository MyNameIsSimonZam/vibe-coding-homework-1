const readline = require("node:readline/promises");

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  if (!Number.isFinite(budget) || budget < 0 || !Number.isFinite(price) || price <= 0) {
    return 0;
  }

  let tickets = 0;
  let remaining = budget;

  while (remaining >= price) {
    remaining -= price;
    tickets += 1;
  }

  return tickets;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log("Неизвестная категория");
    return;
  }

  const tickets = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${tickets} шт.`);
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let built = 0;

  for (let step = 1; step <= height; step += 1) {
    if (step === 4) {
      continue;
    }

    console.log(`Ступень ${step}`);
    built += 1;

    if (step === 10) {
      console.log("Дальше лестница не построена");
      break;
    }
  }

  console.log(`Всего построено: ${built}`);
}

function isNonNegativeNumber(value) {
  return Number.isFinite(value) && value >= 0;
}

async function main() {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Выберите задачу:");
  console.log("1 — билетная касса");
  console.log("2 — доставка заказа");
  console.log("3 — лестница");

  const choice = Number(await input.question("Ваш выбор: "));

  if (choice === 1) {
    const category = Number(await input.question("Категория билета: "));
    const budget = Number(await input.question("Бюджет: "));

    if (isNonNegativeNumber(budget)) {
      printTicketResult(category, budget);
    } else {
      console.log("Бюджет должен быть неотрицательным числом");
    }
  } else if (choice === 2) {
    const distance = Number(await input.question("Расстояние: "));
    const total = Number(await input.question("Сумма заказа: "));

    if (isNonNegativeNumber(distance) && isNonNegativeNumber(total)) {
      printDelivery(distance, total);
    } else {
      console.log("Расстояние и сумма заказа должны быть неотрицательными числами");
    }
  } else if (choice === 3) {
    const height = Number(await input.question("Высота лестницы: "));

    if (Number.isSafeInteger(height) && height >= 0) {
      printSteps(height);
    } else {
      console.log("Высота должна быть неотрицательным целым числом");
    }
  } else {
    console.log("Такой задачи нет");
  }

  input.close();
}

main();
