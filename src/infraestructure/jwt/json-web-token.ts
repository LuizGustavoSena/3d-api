import jwt from "jwt-simple";
import { env } from "../validations/zod/env";
import { RequestToken, ResponseToken, ResponseValidate } from "../../data/protocols/jwt";
import { IJwt } from "../../data/protocols/jwt";

export class JsonWebToken implements IJwt {
    generate = (params: RequestToken): ResponseToken => {
        const issued = Date.now();

        const token = jwt.encode(
            {
                ...params,
                issued: issued,
                expires: issued + 3600000
            },
            env.SECRET_KEY_TOKEN,
            "HS512"
        );

        return { token };
    }

    validate = (token: string): ResponseValidate => {
        try {
            const result = jwt.decode(token, env.SECRET_KEY_TOKEN, false, 'HS512');

            if (!result || result.expires < new Date())
                return null;

            return result
        } catch (error) {
            return null;
        }
    }
}