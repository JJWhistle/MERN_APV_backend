import nodemailer from "nodemailer";
// import dotenv from 'dotenv/config';

const emailRegistro = async (datos) => {
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
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        <p>
            Tu cuenta ya está lista, verifica tu correo en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p>
        
        <p>Si no creaste esta cuenta, ingora este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", info.messageId);

}



export default emailRegistro;