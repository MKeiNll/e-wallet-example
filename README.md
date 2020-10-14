# E-wallet example

A sample e-wallet application.
Consists of 2 parts - Spring Boot REST API & React UI. 

## Features

+ E-wallet management
  + List of wallets & their balances.
  + Wallet creation.
  + Addition & withdrawal of funds.
  + Wallet to wallet transactions.
  + Any wallet balance cannot go smaller than 0.
  + Any wallet balance cannot go greater than 100 decimals + 2 fraction digits.
+ Basic authorization
  + Basic access authentication is required on every request to API.
  + 1 account for all actions.

## Running the app

**To run the back-end, a running PostgreSQL server is required & corresponding configuration properties in the `application.properties` file have to be set:**
```
spring.datasource.url=jdbc:postgresql://<host>:<port>/<database>
spring.datasource.username=<username>
spring.datasource.password=<password>
```

back-end: `cd api` > `gradle bootRun` OR using gradle wrapper: `cd api` > `sudo chmod +x gradlew` > `./gradlew bootRun`\
front-end: `cd front` > `npm i` > `npm start`\
`gradle test` to run back-end tests.

**Master account credentials: username - 'admin' & password - 'admin'**

## Known issues

+ Not running within Docker infrastructure.
+ Back-end tests do not cover all scenarios & routes.
+ Master user credentials are hard-coded, could be a configuration parameter instead.
+ Amounts of decimal & fraction digits stored in the database are hard-coded, could be configuration parameters instead.
+ UI error handling is far from perfect. In the case of any non-HTTP-200 response, a generic error message is shown.
+ Wallets can not be deleted.
+ The wallet list is not sortable/pageable.
+ A transaction can be made to the same wallet from which it is being sent (is this a bug or a feature?).
+ UI translation file has only 1 language.
