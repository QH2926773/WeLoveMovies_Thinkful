const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function validateReviewId(req, res, next) {
	const { reviewId } = req.params;
	const review = await service.read(Number(reviewId));
	if(review) {
		res.locals.review = review;
		return next();
	}
	next({
		status: 404,
		message: "Review cannot be found."
	});
}

async function readReviews(req, res) {
	const reviews = await service.readReviews(res.locals.movie.movie_id);
	for(let review of reviews) {
		const critic = await service.readCritic(review.critic_id);
		review["critic"] = critic;
	}
	res.json({ data: reviews });
}

// function hasScoreAndBody(req, res, next){
//     const { data: { score = null, content = null } = {} } = req.body
//     let updatedObject = {}
//     if (!score && !content){
//         return next({ status:400, message: "missing score and/or content"})
//     }
//     if(score){
//         updatedObject.score = score;
//     }
//     if (content) {
//         updatedObject.content = content
//     }
//       res.locals.update = updatedObject
//       next()
// }

// async function update(req, res){ 
 
//  const  review = res.locals.reviews
//  const updatedReview={
//    ...req.body.data,
//    review_id: review.review_id
//  }
//    await service.update(updatedReview)
//    const newReview={
//    ...review,
//    critic: await service.getCritic(review.critic_id)
//  }
//     res.status(200).json({data:newReview})
//     }

async function update(req, res) {
	const newReview = {
		...req.body.data,
		review_id: res.locals.review.review_id,
	}
	await service.update(newReview);
	const review = await service.read(res.locals.review.review_id);
	const reviewToReturn = {
		...review,
		critic: await service.getCritic(res.locals.review.critic_id),
	}
	res.json({ data: reviewToReturn });
}

async function destroy(req,res){
  await service.delete(res.locals.review.review_id)
  res.sendStatus(204)
}


module.exports={
  update: [asyncErrorBoundary(validateReviewId),asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(validateReviewId), asyncErrorBoundary(destroy)],
  readReviews,
}