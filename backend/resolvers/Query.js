/** @format */
const getUserId = require("../utils/getUserId");

const Query = {
	users: (parent, args, ctx, info) => {
		return ctx.ModelUser.find();
	},
	user: (parent, args, ctx, info) => {
		return ctx.ModelUser.findById(args.id);
	},
	myProfile: (parent, args, ctx, info) => {
		const userId = getUserId(ctx.request);
		return ctx.ModelUser.findById(userId);
	},
	movies: (parent, args, ctx, info) => {
		return ctx.ModelMovie.find();
		// .where("MoviePrice")
		// .gte(args.queries.lowPrice)
		// .lte(args.queries.highPrice)
		// .sort({ MoviePrice: args.queries.sort })
		// // .where({ MovieType: args.queries.type })
		// // .where({ MovieModel: args.queries.model })
		// // .where({ MovieColor: args.queries.color })
		// // .where({ MovieYear: args.queries.year })
		// .limit(args.queries.limit)
		// .skip(args.queries.skip)

		// { MovieFrame: args.queries.frame }
	},
	movie: (parent, args, ctx, info) => {
		return ctx.ModelMovie.findById(args.id);
	},
};

module.exports = Query;
