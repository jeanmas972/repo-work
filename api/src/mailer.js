
import nodemailer from "nodemailer";

const from = '"Bookworm" <info@bookworm.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const userConfirmation = user.generateConfirmationUrl();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Bookworm",
    text: `
    Welcome to Bookworm. Please, confirm your email.
    ${userConfirmation}
    `
  };

  console.log(userConfirmation);

  // transport.sendMail(email);
}


export function sendResetPasswordEmail(user) {
  const transport = setup();
  const userReset = user.generateResetPasswordLink();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link
    ${userReset}
    `
  };

  console.log(userReset);

  // transport.sendMail(email);
}


/*
Pour des mails plus spécifiques, utiliser des templates 

*/