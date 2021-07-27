import UserAdapter from "../../adapters/MongoAdapter/userAdapter";
import EncryptAdapter from "../../adapters/securityAdapter/bcryptAdapter";
import TokenAdapter from "../../adapters/securityAdapter/jsonwebtokenAdapter";
import registerUser from "./userInteractors/registerInteractor";
import loginUser from "./userInteractors/loginInteractor";
import applicationMiddleaware from "./middlewareInteractor";

const userAdapter = new UserAdapter();
const encryptAdapter = new EncryptAdapter();
const tokenAdapter = new TokenAdapter();

const register = registerUser(userAdapter, encryptAdapter, tokenAdapter);
const login = loginUser(userAdapter, encryptAdapter, tokenAdapter);
const middleware = applicationMiddleaware(tokenAdapter, userAdapter);

export { register as registerUser, login as loginUser, middleware };
