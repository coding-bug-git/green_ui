import JSEncrypt from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwSUTji17UIhCgWc23TQuHvK+4\n' +
  '2nxiO7jpmCBqkbtZlXokuWocdDHfA86QladuYN8A7o+xfiLemQmcGYRxKXui5H99\n' +
  '7yIPNPb1Wmfn5pYbFf8ySizn7a8L5G5hKutgH+1/vZQJeQr7z6t2U0QMbmHSSpT3\n' +
  'rXHYs1bMcnQwhUOosQIDAQAB\n' +
  '-----END PUBLIC KEY-----\n'

const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
  'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALBJROOLXtQiEKBZ\n' +
  'zbdNC4e8r7jafGI7uOmYIGqRu1mVeiS5ahx0Md8DzpCVp25g3wDuj7F+It6ZCZwZ\n' +
  'hHEpe6Lkf33vIg809vVaZ+fmlhsV/zJKLOftrwvkbmEq62Af7X+9lAl5CvvPq3ZT\n' +
  'RAxuYdJKlPetcdizVsxydDCFQ6ixAgMBAAECgYAGQbN2N/4XnVXluwo4FT3xhVrf\n' +
  'PrHncqMvdzy/S4jQtyNspkAD3oPenG36Z7VXj4yapdznuchXCitzJNy0f3pp0IDb\n' +
  'wg+1X1V685jRIkPV2AjFWbM+dlaL/FBHPc1qsu9f/f7cBskw4NYr332gS4z2u/BN\n' +
  '5fsGxRGhnS/NvVWvoQJBAOODCr7IGy9lg/gzM1rxvrVbjKfk7eE4j6jFBRbe+vu2\n' +
  'l+WJWiWvJfKfbvVwH18/JjyH+Znqwv72N7t11Jf60m0CQQDGXCxt0tyTAv5cunVA\n' +
  'eWzmn/kB99XGWn6PRzwm6AUhWEMLBBQuBj7bnFmCM+wMk1emQn/qe8arv5kG9hzY\n' +
  '4GTVAkEA19c3d33ihJm7lNoGS65zLh1XmOUQZQ5DBGs+A8+xruIwwxwGwR+kUcS+\n' +
  'AO3JZZREk0KxIzvcmQRAJYGJGlJkFQJBAI18TYyAbSjHZ9uIe/3jHpRZ4ulOd8Ml\n' +
  '5UQZkYRG1vHz3M5MuIAjoE5Q9V9z3ZkSt+A1arw8UXdMEMDwZ58iX4kCQBKVCNnk\n' +
  'RRr+zntPp0p9UuIZbrUFmtBJwkHI596VhoHDD/4ej0hAIusFGhTXVvgB1daJ/87j\n' +
  'Hw5Ms56De5smkWs=\n' +
  '-----END PRIVATE KEY-----\n'

// 加密
const encryptor = new JSEncrypt()
encryptor.setPublicKey(publicKey) // 设置公钥
encryptor.setPrivateKey(privateKey) // 设置私钥

export function encrypt (str: string) {
  return encryptor.encrypt(str) // 对数据进行加密
}

// 解密
export function decrypt (txt: string) {
  return encryptor.decrypt(txt) // 对数据进行解密
}
