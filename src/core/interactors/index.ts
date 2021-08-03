import UserAdapter from "../../adapters/MongoAdapter/userAdapter";
import PublishAdapter from "../../adapters/MongoAdapter/publishAdapter";
import EncryptAdapter from "../../adapters/securityAdapter/bcryptAdapter";
import TokenAdapter from "../../adapters/securityAdapter/jsonwebtokenAdapter";

import registerUser from "./userInteractors/registerInteractor";
import loginUser from "./userInteractors/loginInteractor";
import applicationMiddleaware from "./middlewareInteractor";
import createPublish from "./publishInteractors/publishInteractor";
import likePublish from "./publishInteractors/likeInteractor";

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
