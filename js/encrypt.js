function generateKeys() {
    var rsaKeypair = KEYUTIL.generateKeypair("RSA", 2048);
    var privateKey = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS8PRV");
    var publicKey = KEYUTIL.getPEM(rsaKeypair.pubKeyObj);
    var publicKeyDiv = document.getElementById('public-key');
    publicKeyDiv.innerText = publicKey;
    var privateKeyDiv = document.getElementById('private-key');
    privateKeyDiv.innerText = privateKey;
}

function encrypt() {
  var message = document.getElementById('clear-input').value;
  var publicKey = KEYUTIL.getKey(document.getElementById('encrypt-key').value);
  try {
    var encryptedMessage = KJUR.crypto.Cipher.encrypt(message, publicKey, "RSA");
    var encryptedMessageDiv = document.getElementById('encrypted-message');
    encryptedMessageDiv.innerText = encryptedMessage;
  } catch (error) {
    alert(error);
  }

}

function decrypt() {
  var message = document.getElementById('encrypted-input').value;
  var privateKey = KEYUTIL.getKey(document.getElementById('decrypt-key').value);
  try {
    var decryptedMessage = KJUR.crypto.Cipher.decrypt(message, privateKey, "RSA");
    if (!decryptedMessage) {
      alert("Message et clé non-compatibles.");
    } else {
      var decryptedMessageDiv = document.getElementById('decrypted-message');
      decryptedMessageDiv.innerText = decryptedMessage;
    }
  } catch (error) {
    alert(error);
  }
}
