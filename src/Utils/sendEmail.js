import nodemailer from 'nodemailer';

const sendEmail = async ({to, subject, text}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shanmaqbool12345@gmail.com',
      pass: 'wxairfevvpmtchic',  // Note: Avoid exposing sensitive info like passwords in code.
    },
  });

  const mailOptions = {
    from: 'shanmaqbool12345@gmail.com',
    to,
    subject,
    html:text,  // Using 'html' instead of 'text' to send HTML content
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
