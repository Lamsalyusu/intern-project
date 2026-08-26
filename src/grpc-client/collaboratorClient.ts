import grpc from '@grpc/grpc-js';
import protoloader from '@grpc/proto-loader'
import ENV from "../../../server/src/config/env";

const packagedefinition = protoloader.loadSync(ENV.TASKCOLLABORATOR_PROTO_PATH,ENV.PROTO_LOADER_OPTIONS);
const taskCollaboratorProto = grpc.loadPackageDefinition(packagedefinition) as any;
const NotificationService = taskCollaboratorProto.taskcollaborator.taskCollaborator;
const COLLABORATOR_HOST_URL = process.env.GRPC_PORT || 'localhost:50051';
const NotificationClient = new NotificationService(COLLABORATOR_HOST_URL, grpc.credentials.createInsecure());

export default NotificationClient;  