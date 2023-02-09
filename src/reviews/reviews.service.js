const knex = require("../db/connection")

function read(reviewId){
  return knex("reviews")
//   .join("critics as c","r.critic_id","c.critic_id")
//   .select("r.*","c.*")
  .select("*")
  .where({"review_id":reviewId})
  .first()
}

// function update(updatedReviews){
//   return knex("reviews")
//   .select("*")
//   .where({"review_id":updatedReviews.review_id})
//   .update({...updatedReviews})
  
// }
function update(review){
    return knex("reviews")
    .select("*")
    .where({ review_id: review.review_id })
    .update(review)
}

function getCritic(critic_id){
  return knex("critics")
  .select("*")
  .where({"critic_id":critic_id})
  .first()
}

function readReviews(movieId) {
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

function destroy(reviewId){
  return knex("reviews")
  .where({"review_id":reviewId})
  .del()
}


module.exports = {
    read,
    delete: destroy,
    getCritic,
    update,
    readReviews,
}