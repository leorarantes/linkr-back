import chalk from "chalk";
import sharesRepository from "../Repositories/sharesRepository.js";
import postsRepository from "../Repositories/postsRepository.js";

export async function sharePost (req,res) {
	const { user } = res.locals;
	const { id } = req.body;

	try {
		const postQuery = await postsRepository.getPostById(id);
		if(postQuery.rowCount === 0) return res.sendStatus(404);
		const [post] = postQuery.rows;

		await postsRepository.updatePostShareCount(post.shareCount, post.id);

		await sharesRepository.addShare(post.id, user.id);

		return res.sendStatus(201);
	} catch(err) {
		console.log(chalk.bold.red(err));
        return res.sendStatus(500);
	}
};