/** @format */
/** @format */

const Comment = {
	commentedBy: async (parent, args, ctx, info) => {
		const user = await ctx.ModelUser.findById(parent.commentedBy);
		return user;
	},
	inMovie: async (parent, args, ctx, info) => {
		const Movie = await ctx.ModelMovie.findById(parent.inMovie);
		return Movie;
	},
};

module.exports = Comment;
