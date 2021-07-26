import UserAdapter from "../../adapters/MongoAdapter/userAdapter";
import registerUser from "./userInteractors/register";

const userAdapter = new UserAdapter();

const register = registerUser(userAdapter);
export { register as registerUser };
