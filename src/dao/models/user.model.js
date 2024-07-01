import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	age: { type: Number, required: true },
	country: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	QR: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "QRCode", // Se hace referencia al modelo QRCode (qr.model.js)
	},
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
