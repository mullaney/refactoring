import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText (data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data) {
  let result = `<h1>Statement for ${data.customer}</h1>`;
  result += "<table>";
  result += "<tr><th>play</th><th>seats</th><th>costs</th></tr>";
  result += data.performances.map(perf => {
    return `<tr><td>${perf.play.name}</td><td>${perf.audience}</td><td>${usd(perf.amount)}</td></tr>`;
  }).join("\n");
  result += "</table>";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em></p>`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber/100);
}

export {
  statement,
  htmlStatement
}
