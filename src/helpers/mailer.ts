import User from '@/models/userModel'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'


export const sendEmail=async({email,emailType,userId}:any)=>{
        
    try {
        const hashedToken=await bcrypt.hash(userId.toString(),10);
        if (emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000
            })
        }
        else if (emailType==="RESET")
        {
            await User.findByIdAndUpdate(userId,
                {pargotPasswordToken:hashedToken,forgotPasswordExpiry:Date.now()+3600000 });
            
        }
    
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.DOMAIN_USERNAME,
              pass: process.env.DOMAIN_PASSWORD,
              //TODO: add these credentials to .env file
            }
          });

        const mailOptions = {
            from: 'rohan@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse=await transport.sendMail(mailOptions);
        // console.log("MAIL RESPONSE",mailresponse);
        return mailresponse;

    
    } catch (error:any ) {
        throw new error (error.message);
        
    }

}

