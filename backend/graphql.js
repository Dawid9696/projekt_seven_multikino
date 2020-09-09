/** @format */

const { GraphQLServer, PubSub } = require("graphql-yoga");
require("dotenv").config();

//MONGOOSE CONNECTION
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	dbName: "Kross",
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully !");
});

const pubsub = new PubSub();

//IMPORTED MODELS
const ModelUser = require("./models/user");
const ModelMovie = require("./models/movie");
const ModelComment = require("./models/comment");

//IMPORTED TYPES
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutations");
const Comment = require("./resolvers/Comment");
const User = require("./resolvers/User");
const Movie = require("./resolvers/Movie");
const Subscription = require("./resolvers/Subscription");

//SERVER
const server = new GraphQLServer({
	typeDefs: "./schema.graphql",
	resolvers: { Query, Mutation, User, Movie, Comment, Subscription },
	context(request) {
		return { ModelUser, ModelMovie, ModelComment, request, pubsub };
	},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
