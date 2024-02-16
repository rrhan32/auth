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
            console.log("verifiesd");
        }
        else if (emailType==="RESET")
        {
            await User.findByIdAndUpdate(userId,
                {pargotPasswordToken:hashedToken,forgotPasswordExpiry:Date.now()+3600000 });
            
        }
    
        console.log("here")
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1a0646dc1e616f",
              pass: "bbd0245c87b5fc"
            }
          });
        console.log("there")
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
        console.log("error occured",error.message);
        throw new error (error.message);
        
    }

}

