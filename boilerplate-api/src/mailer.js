import nodemailer from 'nodemailer';

const from = '"Boilerplate" <info@boilerplate.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to Boilerplate',
    html: `
    <p>Welcome to the app. Please confirm your email.</p>

    <a href='${user.generateConfirmationUrl()}'>Click Here</a>
    `
  }

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    html: `
    <p>To reset password click below.</p>

    <a href='${user.generateResetPasswordLink()}'>Click Here</a>
    `
  }

  transport.sendMail(email);
}

export function sendResetPasswordConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Your Password was Reset',
    text: `
    Your password was just reset. If this was not you please contact us.
    `
  }

  transport.sendMail(email);
}
