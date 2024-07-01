import { Router } from "express";
import qr from "qrcode";
import QRModel from "../dao/models/qr.model.js";
import UserModel from "../dao/models/user.model.js";

const router = Router();

router.post("/newUser", async (req, res) => {
	const newUser = req.body;
	try {
		const user = await UserModel.create(newUser);

		// Generar la imagen del QR como un buffer
		const qrBuffer = await qr.toBuffer(
			JSON.stringify({
				name: user.name,
				surname: user.surname,
				age: user.age,
				country: user.country,
				email: user.email,
			}),
		);

		// Almacenar el buffer en MongoDB como parte del documento QR
		const qrDocument = await QRModel.create({ qrData: qrBuffer });

		// Actualizar el usuario con el ObjectId del documento QR
		user.QR = qrDocument._id;
		await user.save();

		res.status(201).json({
			message: "User and QR code created successfully",
			user: user,
			qr: qrDocument,
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: "Error creating user and QR code", error: err });
	}
});

router.get("/user/:userId/qr", async (req, res) => {
	const userId = req.params.userId;
	try {
		const user = await UserModel.findById(userId);

		if (!user || !user.QR) {
			return res.status(404).send("User or QR code not found");
		}

		// Buscar el documento QR usando el ObjectId almacenado en el usuario
		const qrDocument = await QRModel.findById(user.QR);

		if (!qrDocument) {
			return res.status(404).send("QR code not found");
		}

		// Responde con el QR
		res.setHeader("Content-Type", "image/png");
		res.send(qrDocument.qrData);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error retrieving QR code");
	}
});

export default router;
