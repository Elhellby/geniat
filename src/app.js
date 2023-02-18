const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const env = require("./utils/enviromen")

const app = express();

app.set("port", env.getKey('PORT') || 3000);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: env.getKey('JSON_LIMIT'), extended: true }))
app.use(bodyParser.urlencoded({ limit: env.getKey('JSON_LIMIT'), extended: true }))
app.use(cors());

app.use(require("./routes/configRoute"));

// app.use(require("./handlers/pathErrorHandelr"));

app.listen(app.get("port"), () => {
    console.log(`SERVER iniciado en el puerto ${app.get("port")}`);
});