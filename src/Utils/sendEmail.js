import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shanmaqbool12345@gmail.com',
      pass: 'wxairfevvpmtchic',
    },
  });

  const mailOptions = {
    from: 'shanmaqbool12345@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail ;
