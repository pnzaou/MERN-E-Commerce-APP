const forgotPasswordEmailTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px; text-align: center; border-radius: 8px;">
      <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #ff6600; font-size: 24px; font-weight: 600;">Réinitialisation du mot de passe</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Cher(e) ${name},</p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Vous avez demandé à réinitialiser votre mot de passe. Veuillez utiliser le code OTP suivant pour procéder :</p>
        <div style="background-color: #f7f7f7; color: #ff6600; font-size: 20px; font-weight: bold; padding: 15px; border-radius: 5px; display: inline-block; margin: 20px 0;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #888; line-height: 1.6;">Cet OTP n'est valable qu'une heure. Entrez ce code sur le site Web MERN Ecom APP pour réinitialiser votre mot de passe.</p>
        <p style="font-size: 14px; color: #888; margin-top: 30px;">Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message.</p>
        <p style="font-size: 16px; color: #555; margin-top: 30px;">Merci,</p>
        <p style="font-size: 16px; color: #ff6600; font-weight: bold;">L'équipe MERN Ecom APP</p>
      </div>
    </div>
    `;
};

module.exports = forgotPasswordEmailTemplate