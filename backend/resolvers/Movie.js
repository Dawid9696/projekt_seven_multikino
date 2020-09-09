/** @format */

const Movie = {
	comments: async (parent, args, ctx, info) => {
		const comments = await ctx.ModelComment.find().where({ inMovie: parent.id });
		return comments;
	},
};

module.exports = Movie;
