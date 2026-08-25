import { AwsClientS3 } from "../../../infraestructure/storage/aws-client-s3";

export function FactoryStorage() {
    return new AwsClientS3();
}