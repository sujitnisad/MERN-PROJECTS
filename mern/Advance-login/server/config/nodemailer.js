import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{

        user:'spnisad9700@gmail.com',
        pass:'vjex tkzj qmey waph'
    }
})
export default transporter;