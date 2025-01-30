import SimpleCrypto from "simple-crypto-js";

const secretKey = "some-unique-key";
const simpleCrypto = new SimpleCrypto(secretKey);

const encrypt = (data) => {
  return simpleCrypto.encrypt(data);
};

const decrypt = (data) => {
  return simpleCrypto.decrypt(data);
};
export { encrypt, decrypt };
