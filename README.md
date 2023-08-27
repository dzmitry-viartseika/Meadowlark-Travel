QA: Unit Testing, Integration Testing, and Linting
This chapter covers unit testing, integration testing, and linting. There is only one example that covers all of these topics, which have all been configured according to the content in Chapter 5.

Setup
The example in this chapter has Node module dependencies (express and express-handlebars). These dependencies are listed in the package.json file. However, when you first clone this repo, you won't have them installed (package.json is simply a manifest). To install them, simply run:

npm install
Running
Minimal example; uses Express, but doesn't do very much. To run:

node 00-meadowlark
Then visit http://localhost:3000 in your browser.

Running Tests (Unit and Integration)
To run unit tests (see lib/__tests__/handlers.test.js) and integration tests (see integration-tests/basic-navigation.test.js):

npm test
To see how tests are configured, look at the test script in package.json.

Test Coverage
To see test coverage, run:

npm test -- --coverage
Linting
To lint the application, run:

npm lint