import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
	qrData: Buffer, // Se guarda como binario
});

const QRModel = mongoose.model("QRCode", qrSchema);

export default QRModel;
