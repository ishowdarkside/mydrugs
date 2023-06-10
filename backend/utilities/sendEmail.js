const nodemailer = require("nodemailer");
class Email {
  emailOptions() {
    const transporter = nodemailer.createTransport({
      service: "sendgrid",
      //secure: false,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    return transporter;
  }

  async sendConfirmation(receiver, message) {
    const transporter = this.emailOptions();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: receiver,
      subject: "Confirm Account",
      text: message,
    });
    return `Confirmation email send to ${receiver}`;
  }
}

module.exports = new Email();
