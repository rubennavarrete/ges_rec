import { Usuarios } from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  { jwtVariables } from "../config/variables.config.js"
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

export const sentCredenciales = async (req) => {
    const {correo, nombres, apellidos, cedula, password} = req.body;
    console.log(req.body);

    var mailOptions = {
        from: process.env.EMAIL,
        to: correo,
        subject: 'Bienvenido a SAVELIFE',
        html: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
            <style type="text/css">
            @media only screen and (min-width: 620px) {
        .u-row {
            width: 600px !important;
        }
        .u-row .u-col {
            vertical-align: top;
        }
        
        .u-row .u-col-100 {
            width: 600px !important;
        }
        }
        @media (max-width: 620px) {
        .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
        .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
        }
        .u-row {
            width: 100% !important;
        }
        .u-col {
            width: 100% !important;
        }
        .u-col > div {
            margin: 0 auto;
        }
        }
        body {
        margin: 0;
        padding: 0;
        }
        table,
        tr,
        td {
        vertical-align: top;
        border-collapse: collapse;
        }
        p {
        margin: 0;
        }
        .ie-container table,
        .mso-container table {
        table-layout: fixed;
        }
        * {
        line-height: inherit;
        }
        a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
        }
        table, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }
            </style>
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        </head>
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <span>&#160;</span>
                </td>
            </tr>
            </tbody>
        </table>
            </td>
            </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
    </div>
    </div>
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
        
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;" align="left">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
        </td>
    </tr>
    </table>
        </td>
        </tr>
    </tbody>
    </table>
    <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
        <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;" align="left">
    <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Credenciales de inicio de sesión<br /></span></p>
    </div>
        </td>
        </tr>
    </tbody>
    </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
    </div>
    </div>
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
            
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
                
        <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;">Hola,</span></p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;"><br /><span style="font-size: 16px; line-height: 22.4px;">Le hemos enviado este correo electrónico para facilitarle sus credenciales de usuario de parte de la empresa.</span></p>
        <p style="line-height: 140%;"> </p>
        <p style="line-height: 140%;"><br /><span style="font-size: 16px; line-height: 22.4px;">Para ingresar sus datos de usuario son:</span></p>
        <p style="line-height: 140%;"><strong>Usuario:</strong> ${nombres}</p>
        <p style="line-height: 140%;"><strong>Cédula:</strong> ${cedula}</p>
        <p style="line-height: 140%;"><strong>Contraseña:</strong> ${password}</p>
        </div>
            </td>
            </tr>
        </tbody>
        </table>
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left">
        <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
        <div align="left">
        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:51px; v-text-anchor:middle; width:205px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
            <!--[if mso]></center></v:roundrect><![endif]-->
        </div>
            </td>
            </tr>
        </tbody>
        </table>
        <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
        <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; font-family: 'arial black', AvenirNext-Heavy, 'avant garde', arial; color: #95a5a6;">Ignore este mensaje, es unicamente para mostrar sus credenciales.</span></p>
        </div>
            </td>
            </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
    </body>
    </html>
        `
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    }
    );
}





