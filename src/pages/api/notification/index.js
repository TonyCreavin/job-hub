import { mailOptions, transporter } from '../../../../config/nodemailer';
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    if (!data.firstName || !data.lastName) {
      return res.status(400).json({ message: 'Request unsuccessful' });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        to: data.email,
        subject: data.subject || 'Inscription réussie',
        text: data.message || 'This is a test email',
        html: `<h1>Bonjour ${data.firstName}</h1><p>Vous avez réussi à vous inscrire avec le courriel suivant : ${data.email}</p>`,
      });
      return res.status(200).json({ message: 'Request successful' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Request unsuccessful' });
    }
  }
  res.status(200).json({ message: 'Request successful' });
};
export default handler;
