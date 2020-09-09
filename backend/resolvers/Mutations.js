/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getUserId = require("../utils/getUserId");

const Mutation = {
	logIn: async (parent, args, ctx) => {
		const user = await ctx.ModelUser.find().where({ email: args.email });
		if (!user) throw new Error("User do not exist!");
		const isMatch = await bcrypt.compare(args.password, user[0].password);
		if (!isMatch) throw new Error("No match!");
		const newUser = user[0];
		return { newUser, token: jwt.sign({ userId: user[0].id }, "secret") };
	},
	createUser: async (parent, args, ctx) => {
		try {
			args.userData.password = await bcrypt.hash(args.userData.password, 10);
			const newUser = new ctx.ModelUser({ ...args.userData });
			await newUser.save();
			return { newUser, token: jwt.sign({ userId: newUser.id }, "secret") };
		} catch (err) {
			throw new Error(err);
		}
	},
	updateUser: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (user) {
			const update = { ...args.updateData };
			await ctx.ModelUser.findByIdAndUpdate(userId, update);
			return user;
		}
		throw new Error("Can not update !");
	},
	createMovie: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		if (!userId) throw new Error("Please authenticate !");
		const user = await ctx.ModelUser.findById(userId);
		const movie = { ...args.movieData };
		movie.seance = [...args.seanceData];

		if (user) {
			const newMovie = new ctx.ModelMovie(movie);
			console.log(newMovie);
			await newMovie.save();
			return newMovie;
		}
		throw new Error("Error!!!");
	},
	createComment: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		const Movie = await ctx.ModelMovie.findById(args.commentData.inMovie);
		if (user && Movie) {
			const newComment = new ctx.ModelComment({ ...args.commentData });
			console.log("/wykon");
			ctx.pubsub.publish(`comment ${args.commentData.inMovie}`, { comment: newComment });
			newComment.commentedBy = userId;
			await Movie.comments.push(newComment._id);
			await newComment.save();
			await Movie.save();
			console.log("Wysłane");
			return newComment;
		}
		throw new Error("Error!!!");
	},
	updateMovie: async (parent, args, ctx) => {
		const userId = getUserId(ctx.request);
		if (!userId) throw new Error(err);
		const update = { ...args.updateMovie };
		try {
			await ctx.ModelMovie.findByIdAndUpdate(args.id, update);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteUser: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		try {
			await ctx.ModelUser.findByIdAndDelete(userId);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteMovie: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const User = await ctx.ModelUser.findById(userId);
		if (!User.admin) throw new Error("Can not delete Movie!");
		try {
			await ctx.ModelMovie.findByIdAndDelete(args.id);
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteComment: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const comment = await ctx.ModelComment.findById(args.id);
		if (comment.commentedBy != userId) throw new Error("Can not delete comment!");
		try {
			await comment.remove();
			return comment;
		} catch (err) {
			throw new Error(err);
		}
	},
	addTicket: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (!userId) throw new Error("User did not find!");
		try {
			await user.myTickets.push(args.id);
			await user.save();
			return user;
		} catch (err) {
			throw new Error(err);
		}
	},
	deleteTicket: async (parent, args, ctx) => {
		//AUTHORIZATION
		const userId = getUserId(ctx.request);
		const user = await ctx.ModelUser.findById(userId);
		if (!userId) throw new Error("User did not find!");
		try {
			const userTickets = await user.myTickets.filter((item) => {
				return item != args.id;
			});
			user.myTickets = userTickets;
			await user.save();
			return user;
		} catch (err) {
			throw new Error(err);
		}
	},
};
module.exports = Mutation;
