var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation{
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var courseData = [
    {
        id: 1,
        title: 'Micheal the dev',
        description: 'He is just a learner of Graphql',
        topic: 'Michealdev',
        url: 'piperlead.io'
    },
    {
        id: 2,
        title: 'Albert the dev',
        description: 'He develops mobile cross platform devices',
        topic: 'Albertdev',
        url: 'alberydev.io'
    },
    {
        id: 3,
        title: 'Daniel the dev',
        description: 'He develops both web and mobile platform',
        topic: 'Daniel the dev',
        url: 'daniel.io'
    }
]

var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    }) [0];
}

var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(courses => course.topic === topic);
    } else {
        return coursesData;
    }
}

var updateCourseTopic = function({id, topic}) {
    coursesData.map(courses => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id) [0];
}

var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('express GraphQL Server Now running on Localhost:4000/graphql'));
