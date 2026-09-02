import { env } from "../infraestructure/validations/zod/env";
import { connectMongo } from "../infraestructure/repositories/mongo/mongo";
import app from "./app";

connectMongo().then(() => {
    app.listen(env.PORT, () =>
        console.log(`Server is running in port ${env.PORT}`)
    );
});
