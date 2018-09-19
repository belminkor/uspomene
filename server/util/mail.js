import nodemailer from 'nodemailer';
import { account } from './acc.config';

export function mail(receiver, msg, subj) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions = {
    // setovan je selekting kao testni samo
    from: `"${account.name}" < ${account.user} >`,
    to: receiver,
    subject: subj,
    //text: msg, // Dodati poruku (vidjet s Damirom),trenutno je testni text
    html: msg,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    }
    console.log('Succes sending mail');
  });

  return { msg: 'Success' };
}
