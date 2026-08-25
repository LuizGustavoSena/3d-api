import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IStorage, SetItemProps } from "../../data/protocols/storage";
import { env } from "../validations/zod/env";

export class AwsClientS3 implements IStorage {
    private s3: S3Client;
    
    constructor() {
        this.s3 = new S3Client({
            region: env.S3_REGION,
            credentials: {
                accessKeyId: env.S3_ACCESS_KEY_ID,
                secretAccessKey: env.S3_SECRET_ACCESS_KEY,
            },
          });
    }

    async setItem(params: SetItemProps): Promise<string> {
        const { key, file, contentType } = params;

        await this.s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: key,
              Body: file,
              ContentType: contentType,
            }),
          );
        
          return key;
    }
}
