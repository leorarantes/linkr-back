import chalk from "chalk";
import likesRepository from "../Repositories/likesRepository.js";

async function likePost (req,res) {
	const { user } = res.locals;
	const { id } = req.body;

	try {
		const liked = await likesRepository.getUserLiked(user.id, id);
		if (liked.rowCount) {
			await likesRepository.decreaseLikeCount(id)
			await likesRepository.dislikePost(user.id, id);

			return res.sendStatus(204)
		}

		await likesRepository.increaseLikeCount(id)
		await likesRepository.likePost(user.id, id);

		return res.sendStatus(201)
	} catch(err) {
		console.log(chalk.bold.red(err));
    	return res.sendStatus(500);
	}
};

export default likePost