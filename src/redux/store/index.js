import { createStore } from "redux";
import SimpleCrypto from "simple-crypto-js";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const secretKey = "some-unique-key";

const simpleCrypto = new SimpleCrypto(secretKey);

function saveToLocalStorage(state) {
  try {
    const serialized = JSON.stringify(state);
    const encrypted = simpleCrypto.encrypt(serialized);
    localStorage?.setItem("bulkdata", JSON.stringify(encrypted));
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialized = localStorage?.getItem("bulkdata");
    const decrypt = simpleCrypto.decrypt(JSON.parse(serialized));
    if (decrypt === null) return undefined;
    return decrypt;
  } catch (e) {
    return undefined;
  }
}

const completeData = loadFromLocalStorage();

const store = createStore(rootReducer, completeData, composeWithDevTools());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
