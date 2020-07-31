# BlockIdCoinWallet - A Cortez Vault mobile wallet

The first ever Cortez Vault wallet.

[![Playstore](https://bluewallet.io/img/play-store-badge.svg)](https://play.google.com/store/apps/details?id=com.blockidchain.wallet)


## BUILD & RUN IT

* In your console:

```
git clone https://github.com/bitcoinvault/BlockIdCoinWallet.git
cd BlockIdCoinWallet
npm install
```

* Add files for firebase:

For iOS:
GoogleService-Info.plist into directory /ios/

For android:
google-services.json into directory /android/app/

* To run on Android:

```
npm start android
```

* To run on iOS:

```
cd ios
pod install
cd ..
npm start ios
```


## TESTS

```bash
npm run test
```


## LICENSE

MIT
