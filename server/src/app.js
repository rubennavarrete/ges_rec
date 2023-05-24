import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js"
import medicosRoutes from "./routes/medicos.routes.js"
import farmaciasRoutes from "./routes/farmacias.routes.js"
import medicacionesRoutes from "./routes/medicaciones.routes.js"
import modulosRoutes from "./routes/modulos.routes.js"


const app=express();

app.use(express.json());

app.use(usuariosRoutes);
app.use(medicosRoutes);
app.use(farmaciasRoutes);
app.use(medicacionesRoutes);
app.use(modulosRoutes);

export default app;