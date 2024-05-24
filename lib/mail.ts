import nodemailer from "nodemailer";

export const SendVerificationEmail = async (
  email: string,
  token: string,
  OldEmail?: string
) => {
  const confirmationLink = OldEmail
    ? `${process.env.URL}/auth/new-verification?token=${token}&email=${OldEmail}`
    : `${process.env.URL}/auth/new-verification?token=${token}`;

  const transport = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "Param1vir4@outlook.com",
      pass: process.env.MICROSOFT_APP_PASS,
    },
  });

  const mailOptions = {
    from: "Param1vir4@outlook.com",
    to: email,
    subject: "Email Verification",
    html: `
      <p>Thank you for registering. Please click the link below to verify your email:</p>
      <a href="${confirmationLink}">Verify Email</a>
    `,
  };

  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export const SendRestPasswordToken = async (email: string, token: string) => {
  const ResetLink = `${process.env.URL}/auth/reset-password?token=${token}`;
  const transport = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "Param1vir4@outlook.com",
      pass: process.env.MICROSOFT_APP_PASS,
    },
  });
  const mailOptions = await transport.sendMail({
    from: "param1vir4@outlook.com",
    to: email,
    subject: "Resetting Account Password",
    html: `
    <p>In prder to reset your password click <a href="${ResetLink}">here</a></p>
    
  `,
  });
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
export const SendTwoFactorEmail = async (email: string, token: string) => {
  const transport = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "Param1vir4@outlook.com",
      pass: process.env.MICROSOFT_APP_PASS,
    },
  });
  const mailOptions = await transport.sendMail({
    from: "param1vir4@outlook.com",
    to: email,
    subject: "2FA Code",
    html: `
    <p> Your 2FA code ${token}</p>
    
  `,
  });
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
