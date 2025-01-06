const { Resend } = require("resend")
require("dotenv").config()

if(!process.env.RESEND_API_KEY) {
    console.log("Veuillez ajouter RESEND_API_KEY dans le fichier .env")
}

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async ({sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'MERN-Ecom-App <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data
    } catch (error) {
        console.log("Erreur dans sendEmail", error)
    }
}

module.exports = sendEmail