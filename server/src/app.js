import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js"
import rolesRoutes from "./routes/roles.routes.js"
import perfilesRoutes from "./routes/perfiles.routes.js"
import pacientesRoutes from "./routes/pacientes.routes.js"
import medicosRoutes from "./routes/medicos.routes.js"

const app=express();

app.use(express.json());

app.use(usuariosRoutes);
app.use(rolesRoutes);
app.use(perfilesRoutes);
app.use(pacientesRoutes);
app.use(medicosRoutes);


export default app;