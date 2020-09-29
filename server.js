var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        message: String
    }
`);

var root = {
    message: () => 'Hello World!'
};

var app = express();
app.use('/graph', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now RUnning on Localhost:4000/graphql'));

