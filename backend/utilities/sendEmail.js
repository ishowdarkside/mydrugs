const nodemailer = require("nodemailer");
class Email {
  emailOptions() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      service: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    return transporter;
  }

  async sendConfirmation(receiver, message) {
    const transporter = this.emailOptions();
    await transporter.sendMail({
      from: "MyDrugs <hello@mydrugs.io>",
      to: receiver,
      subject: "Confirm Account",
      text: message,
    });
    return `Confirmation email send to ${receiver}`;
  }
}

module.exports = new Email();
