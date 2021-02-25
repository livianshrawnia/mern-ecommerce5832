const mailgun = require('../config/mailgun');
const template = require('../config/template');

exports.sendEmail = async (email, type, data) => {
  let result;
  let response;

  try {
    const message = prepareTemplate(type, data);

    response = await mailgun.sendEmail(email, message);
  } catch (error) {}

  if (response) {
    result = response;
  }

  return result;
};

const prepareTemplate = (type, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);

      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
