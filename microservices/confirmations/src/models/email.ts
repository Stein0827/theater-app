import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";

dotenv.config();
export async function sendEmail(emailAddr: string | undefined, id: string | undefined, price: number | undefined, addr: string | undefined) {
  console.log(process.env.EMAIL);
  console.log(process.env.PASS);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });

  const mailOptions = {
    from: 'ts5588881@gmail.com',
    to: emailAddr,
    subject: `Ticket purchased ID: ${id}`,
    text: `Dear Customer, \n\nThis is the confirmation of your order.\ntotal price: ${price}\npurhcase Address: ${addr}\n\nThank you`,
  };

  transporter.sendMail(mailOptions, function(error: any, info: any){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}

