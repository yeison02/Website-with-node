import express from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import nodemailer from "nodemailer";
//import http from "http";

const app = express();
// Crear ruta absoluta

const __dirname = dirname(fileURLToPath(import.meta.url));
// Creamos un servidor http//const server = http.server(app);

app.use(express.json());
// analiza los datos codificados en la URL enviados en la solicitud POST.
app.use(express.urlencoded({ extended: true }));
//Usar las rutas
app.use(indexRoutes);
// Usar archivos estaticos
app.use(express.static(join(__dirname, "public")));

app.set("views", join(__dirname, "views"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public"));
});

app.post("/send_email", function (req, res) {
  const from = req.body.from;
  const to = req.body.to;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yeison.suarezt@gmail.com",
      pass: "podygwnefqdqozxn",
    },
  });
  const mailOptions = {
    from: from,
    to: to,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado");
    }
    res.redirect("/");
  });
});

app.listen(3000);
console.log("server is listening on port ", 3000);
