/** @format */

const Subscription = {
	count: {
		subscribe(parent, args, { pubsub }, info) {
			let count = 0;

			setInterval(() => {
				count++;
				pubsub.publish("count", {
					count,
				});
			}, 1000);

			return pubsub.asyncIterator("count");
		},
	},
	comment: {
		subscribe(parent, { movieId }, { ModelMovie, pubsub }, info) {
			const movie = ModelMovie.findById(movieId);

			if (!movie) {
				throw new Error("movie not found");
			}

			return pubsub.asyncIterator(`comment ${movieId}`);
		},
	},
};

module.exports = Subscription;
