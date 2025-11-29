import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, phone, email, textarea } = body;

    const data = await resend.emails.send({
      from: "contact@lafabriqueducode.fr",
      to: `contact@lafabriqueducode.fr`,
      subject: "Nouveau formulaire de contact",
      html: `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nouveau Message - Formulaire de Contact</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">

    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
        
        <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-top: 0;">
            📩 Nouveau Message de Contact
        </h2>
        
        <p>Vous avez reçu une nouvelle soumission via le formulaire de contact de votre site.</p>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td style="padding: 5px 0;">
                        <strong style="color: #555;">👤 Nom :</strong> ${name}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;">
                        <strong style="color: #555;">📞 Téléphone :</strong> ${phone}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 5px 0;">
                        <strong style="color: #555;">📧 E-mail :</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                    </td>
                </tr>
            </table>
        </div>
        
        <h3 style="color: #333; margin-top: 20px;">Message :</h3>
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; background-color: #ffffff; white-space: pre-wrap;">
            ${textarea}
        </div>

        <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
            Ceci est un e-mail automatique. Veuillez ne pas y répondre directement.
        </p>
        
    </div>

</body>
</html>
            `,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
});
