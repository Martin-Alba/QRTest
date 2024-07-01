import mongoose from "mongoose";
import { PORT, MONGO_DB } from "../config/config.js";

export const ServerUp = async (app) => {
	try {
		await mongoose.connect(MONGO_DB.URI, {
			dbName: MONGO_DB.NAME,
		});
		console.log(`DB '${MONGO_DB.NAME}'  connected successfully`);
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
};
