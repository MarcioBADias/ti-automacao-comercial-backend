const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marcius.dev.estudos@gmail.com",
    pass: "SUA_SENHA_DE_APP",
  },
});

exports.sendEmailOnNewContact = functions.firestore
  .document("contacts/{contactId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: data.email,
      to: "marcius.dev.estudos@gmail.com",
      subject: "Novo Contato do Formulário",
      text: `Nome: ${data.fullName}
Email: ${data.email}
WhatsApp: ${data.whatsapp}
Instagram: ${data.instagram}
Faturamento: ${data.revenues}
Dispositivos: ${data.devices}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("E-mail enviado!");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  });
