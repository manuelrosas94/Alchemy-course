import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) { //agregar private key y set
  async function onChange(evt) {
    const privateKey = evt.target.value; //privatekey for address
    setPrivateKey(privateKey); //privatekey for address
    const address = toHex(secp.getPublicKey(privateKey)); //get public key of private key
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        {/* Wallet Address */} Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
        {/* change address for privateKey */}
      </label>

      <div>
        Address: {address.slice(0,20)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
