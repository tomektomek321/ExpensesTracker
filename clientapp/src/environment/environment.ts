const urls = {
  developement: "http://localhost:5139/api/",
  produdction: "http://localhost:5139/api/",
}

enum environmentState {
  developement = "developement",
  produdction = "produdction",
}

// set environment here
const setEnvironment = environmentState.developement;

export const environment = {
  apiUrl: urls[setEnvironment],
}
