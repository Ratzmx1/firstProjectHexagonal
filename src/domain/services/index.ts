import UserAdapter from "../../adapters/MongoAdapter/userAdapter";
import PublishAdapter from "../../adapters/MongoAdapter/publishAdapter";
import EncryptAdapter from "../../adapters/securityAdapter/bcryptAdapter";
import TokenAdapter from "../../adapters/securityAdapter/jsonwebtokenAdapter";

import registerUser from "./userServices/registerServices";
import loginUser from "./userServices/loginServices";
import applicationMiddleaware from "./middlewareServices";
import createPublish from "./publishServices/publishServices";
import likePublish from "./publishServices/likeServices";

const userAdapter = new UserAdapter();
const publishAdapter = new PublishAdapter();
const encryptAdapter = new EncryptAdapter();
const tokenAdapter = new TokenAdapter();

const loginInteractor = loginUser(userAdapter, encryptAdapter, tokenAdapter);
const middlewareInteractor = applicationMiddleaware(tokenAdapter, userAdapter);
const publishInteractor = createPublish(publishAdapter);
const likeInteractor = likePublish(publishAdapter);
const registerInteractor = registerUser(
  userAdapter,
  encryptAdapter,
  tokenAdapter
);

export {
  registerInteractor as registerUser,
  loginInteractor as loginUser,
  middlewareInteractor as middleware,
  publishInteractor as createPublish,
  likeInteractor as likePublish,
};
