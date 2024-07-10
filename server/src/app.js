import express from "express";
import cookieParser from "cookie-parser";
//RUTAS
import usuariosRoutes from "./routes/usuarios.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import perfilesRoutes from "./routes/perfiles.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import medicosRoutes from "./routes/medicos.routes.js";
import loginRoutes from "./routes/login.routes.js";
import farmaciasRoutes from "./routes/farmacias.routes.js";
import recetasRoutes from "./routes/recetas.routes.js";
import medicacionesRoutes from "./routes/medicaciones.routes.js";
import resetPasswordRoutes from "./routes/reset_password.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import cookiesParser from "cookie-parser";

//MIDDLEWARES
import cors from "cors";
import verificarToken from "../middleware/auth-middleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://localhost:4200",
      "https://ges-rec.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(loginRoutes);
app.use(resetPasswordRoutes);
app.use(verificarToken);
app.use(usuariosRoutes);
app.use(rolesRoutes);
app.use(perfilesRoutes);
app.use(pacientesRoutes);
app.use(medicosRoutes);
app.use(farmaciasRoutes);
app.use(recetasRoutes);
app.use(medicacionesRoutes);
app.use(pdfRoutes);
app.use(ventasRoutes);

export default app;
