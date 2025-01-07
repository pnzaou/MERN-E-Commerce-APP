const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px; text-align: center; border-radius: 8px;">
      <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #ff6600; font-size: 24px; font-weight: 600;">Bienvenue sur MERN Ecom APP</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Cher(e) ${name},</p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Merci de vous être inscrit(e) à notre application. Pour finaliser votre inscription et activer votre compte, veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail.</p>
        <a href="${url}" style="background-color: #ff6600; color: white; padding: 15px 30px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Vérifier Mon Email</a>
        <p style="font-size: 14px; color: #888; margin-top: 30px;">Si vous n'avez pas créé de compte, ignorez simplement ce message.</p>
      </div>
    </div>
    `;
  };
  
  module.exports = verifyEmailTemplate;  