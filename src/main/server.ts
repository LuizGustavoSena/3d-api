import { env } from "../infraestructure/validations/zod/env";
import app from "./app";

app.listen(env.PORT, () =>
    console.log(`Server is running in port ${env.PORT}`)
);