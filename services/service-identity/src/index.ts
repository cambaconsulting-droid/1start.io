// services/service-identity/src/index.ts

import express from 'express';
import { router } from './http/routes'; // Importamos nuestras rutas

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(router); // Usamos el router que hemos creado

app.listen(PORT, () => {
  console.log(`🚀 Identity Service listening on http://localhost:${PORT}`);
});