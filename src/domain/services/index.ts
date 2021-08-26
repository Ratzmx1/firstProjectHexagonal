// import UserAdapter from "../../infraestructure/MongoAdapter/userAdapter";
// import UserAdapter from "../../infraestructure/MongooseAdapter/userAdapter";
import UserAdapter from "../../infraestructure/MysqlAdapter/UserAdapter";

import PublishAdapter from "../../infraestructure/MongoAdapter/publishAdapter";
import EncryptAdapter from "../../infraestructure/securityAdapter/bcryptAdapter";
import TokenAdapter from "../../infraestructure/securityAdapter/jsonwebtokenAdapter";

import registerUser from "./userServices/registerServices";
import loginUser from "./userServices/loginServices";
import getUser from "./userServices/getUserService";
import applicationMiddleaware from "./middlewareServices";
import createPublish from "./publishServices/publishServices";
import likePublish from "./publishServices/likeServices";
import commentPublish from "./publishServices/commentService";
import getAllPublish from "./publishServices/getAllService";
import updateUser from "./userServices/updateUserService";
import updatePassword from "./userServices/updatePasswordService";

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
