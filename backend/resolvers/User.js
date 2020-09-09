/** @format */

const User = {
	myTickets: async (parent, args, ctx, info) => {
		const movies = parent.shoppingCart.map((movie) => {
			return ctx.ModelMovie.findById(movie);
		});
		return movies;
	},
};

module.exports = User;
