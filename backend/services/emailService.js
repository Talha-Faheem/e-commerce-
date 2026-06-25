const resend = require("../config/resend");

async function sendVerification(email) {
  const verifyUrl = "https://figma.com";

  await resend.emails.send({
    from: "Market Hub <onboarding@resend.dev>",

    to: [email],

    subject: "Verify Email",

    html: `
<h1>Welcome</h1>

<a href="${verifyUrl}">
Verify Email
</a>

`,
  });
}

module.exports = {
  sendVerification,
};
