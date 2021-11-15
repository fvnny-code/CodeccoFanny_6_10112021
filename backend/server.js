const http = require("http");
const app = require("./app");

app.set('port', process.env.PORT || 3001);

// la fonction renvoie un port valide, sous forme de numéro ou de chaîne de caractères.
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//Si le port défini par défaut n'est pas accessible, utiliser le port 3000
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

// la fonction recherche les différentes erreurs et les génère de manière appropriée. Elle est ensuite enregistrée dans le serveur.
const errorHandler = (error) => {
  if (error.syscall != "listen") {
    throw error;""
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port: " + port;
  switch (error.code) {
    case "EACCES": //Permission refusée
      console.error(bind + " requires elevated privilleges.");
      process.exit(1);
      break;
    case "EADDRINUSE": //Port déjà actif
      console.error(bind + " is already in use.");
      break;
    default:
      throw error;
  }
};

// Création d'un serveur avec express, qui utilise app et crée une constante pour les appels au serveur (requêtes et réponses)
const server = http.createServer(app);

// lancement du serveur, et écoute d'éventuelles erreurs
server.on("error", errorHandler);
// l'écouteur d'événement est également enregistré dans le serveur, consignant le port ou le canal sur lequel le serveur s'exécute dans la console.
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port " + port;
  console.log("Listening on " + bind);
});

// Le serveur écouter sur le pot défini au dessus.
server.listen(port);
