const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04ee99157a3d989e18147acf8a6235147917228b97912bd3c1a57a5c72a119709d81c16b001dde65a851f6908c687fdcca189c7e1fb6464d62fbc26bd2afb3264e": 100,
  //aee4bf7fa9dfcdb50511af64f96401891f0be3489f1a298c100f06cc7b5b0576 private
  "0484a82001b3994f4632a4b5002886f9e7ece3e5f896966c42fd999bc621ad7d0ee6bbf86e354423f288b16b8a73812c363b91f16b7ce20f0563b65865c6f81a88": 50,
  //fcf57c9ce35c5b3ffbbb2d4f3fd52fa12fe260024c006fef81e2a6163b217788
  "04951d8fd66467637f75fefcc66473a34097f7226966f9ac6f2295560ced1b67ba690a9e358bd4b3a4471cf419e836c6c52a214b476425dbc430008bcb837cb136": 75,
  //2d97c11434d9e73d10ace8bd4df4c0a677eebf88fc7c999cb8d4c0613d692a80
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
