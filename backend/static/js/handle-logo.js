let agent = JSON.parse(localStorage.getItem("client"));
let company = "";
if (agent) {
  company = agent.company;
}
var img = document.getElementById("company-logo");
console.log(img);

if (company == "AMP") {
  img.src = "/static/img/Amprion_2020_logo.svg";
}

if (company == "TTG") {
  img.src = "/static/img/Tennet_TSO_logo.svg";
}

if (company == "TNG") {
  img.src = "/static/img/TransnetBW_logo.svg";
}

if (company == "50Hertz") {
  img.src = "/static/img/Logo_50hertz.svg";
}

if (company == "HOPS") {
  img.src = "/static/img/entose_logo.svg";
}
