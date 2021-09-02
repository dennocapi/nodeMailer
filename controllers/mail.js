const nodemailer = require('nodemailer')

exports.sendMail = async (req, res) => {
    var otp = Math.floor(1000 + Math.random() * 9000);
    const data = `
        <p>This is your one time confirmation code</p>
        <h3>Code : ${otp}</h3>
    `
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Admin" <mycompany@gmail.com>', // sender address
        to: "testuser@gmail.com", // list of receivers
        subject: "Confirmation code ✔", // Subject line
        text: `Confirmation code\nCode: ${otp}`, // plain text body
        html: data, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.status(200).json({status:'success', message:'OTP code sent successfully'})
    
}