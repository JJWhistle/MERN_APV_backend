import nodemailer from "nodemailer";
// import dotenv from 'dotenv/config';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const {email, nombre, token} = datos;

    // Enviar Email
    const info = await transporter.sendMail({
        from: "AVP - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola: ${nombre}, Has solicitado reestablecer tu password.</p>
        <p>
            Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
        </p>
        
        <p>Si no creaste esta cuenta, ingora este mensaje</p>
        `
    });
}



export default emailOlvidePassword;