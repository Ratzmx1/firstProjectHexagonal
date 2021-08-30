// import UserAdapter from "../../infraestructure/MongoAdapter/userAdapter";
// import UserAdapter from "../../infraestructure/MongooseAdapter/userAdapter";
import UserAdapter from "./MysqlAdapter/UserAdapter";

import PublishAdapter from "./MongoAdapter/publishAdapter";
import EncryptAdapter from "./securityAdapter/bcryptAdapter";
import TokenAdapter from "./securityAdapter/jsonwebtokenAdapter";

import registerUser from "../domain/services/userServices/registerServices";
import loginUser from "../domain/services/userServices/loginServices";
import getUser from "../domain/services/userServices/getUserService";
import applicationMiddleaware from "../domain/services/middlewareServices";
import createPublish from "../domain/services/publishServices/publishServices";
import likePublish from "../domain/services/publishServices/likeServices";
import commentPublish from "../domain/services/publishServices/commentService";
import getAllPublish from "../domain/services/publishServices/getAllService";
import updateUser from "../domain/services/userServices/updateUserService";
import updatePassword from "../domain/services/userServices/updatePasswordService";

const userAdapter = new UserAdapter();
const publishAdapter = new PublishAdapter();
const encryptAdapter = new EncryptAdapter();
const tokenAdapter = new TokenAdapter();

const getUserInteractor = getUser(userAdapter);
const updateUserInteractor = updateUser(userAdapter);
const updatePasswordInteractor = updatePassword(userAdapter, encryptAdapter);
const loginInteractor = loginUser(userAdapter, encryptAdapter, tokenAdapter);
const middlewareInteractor = applicationMiddleaware(tokenAdapter, userAdapter);
const publishInteractor = createPublish(publishAdapter);
const likeInteractor = likePublish(publishAdapter);
const commentInteractor = commentPublish(publishAdapter);
const getAllInteractor = getAllPublish(publishAdapter);

const registerInteractor = registerUser(
  userAdapter,
  encryptAdapter,
  tokenAdapter
);

export {
  registerInteractor as registerUser,
  loginInteractor as loginUser,
  getUserInteractor as getUser,
  updateUserInteractor as updateUser,
  middlewareInteractor as middleware,
  publishInteractor as createPublish,
  likeInteractor as likePublish,
  commentInteractor as commentPublish,
  getAllInteractor as getAllPublish,
  updatePasswordInteractor as updatePassword,
};
