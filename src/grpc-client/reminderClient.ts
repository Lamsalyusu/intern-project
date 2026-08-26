import grpc from '@grpc/grpc-js';
import protoloader from '@grpc/proto-loader'
import ENV from "../../../server/src/config/env";

const packageDefinition = protoloader.loadSync(ENV.AUTH_PROTO_PATH, ENV.PROTO_LOADER_OPTIONS,);
const reminderProto = grpc.loadPackageDefinition(packageDefinition) as any;
const ReminderService = reminderProto.authPackage.auth;
const REMINDER_HOST_URL = process.env.PORT || 'localhost:50051';

const reminderClient = new ReminderService(
    REMINDER_HOST_URL,
    grpc.credentials.createInsecure()
);

// module.exports = AuthClient;
export default reminderClient;
