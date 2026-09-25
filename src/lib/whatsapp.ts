export const generateWhatsAppLink = (
  phone: string,
  items: { name: string; quantity: number; size?: string; price: number }[],
  total: number
) => {
  const header = "Inquiry: Ronz Football Club Merchandise\n\nOrder Summary:\n\n";

  const itemStrings = items.map((item, index) => {
    const sizeStr = item.size && item.size !== 'One Size' ? ` (Size: ${item.size})` : '';
    const itemTotal = (item.price * item.quantity).toLocaleString('en-IN');
    return `${index + 1}. ${item.name}${sizeStr}\n   Quantity: ${item.quantity} | Amount: ₹${itemTotal}`;
  });

  const itemsList = itemStrings.join("\n\n") + "\n\n";
  const totalStr = `Total Estimated Value: ₹${total.toLocaleString('en-IN')}\n\n`;
  const footer = "I would like to confirm the availability of these items and proceed with the payment. Please advise on the next steps.\n\nThank you.";

  const fullMessage = header + itemsList + totalStr + footer;
  const encodedMessage = encodeURIComponent(fullMessage);

  let cleanPhone = phone.replace(/[^\d+]/g, '');
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }
  const digitsOnlyPhone = cleanPhone.replace(/\D/g, '');

  return `https://wa.me/${digitsOnlyPhone}?text=${encodedMessage}`;
};

export const generateJoinWhatsAppLink = (
  phone: string,
  applicantDetails: {
    firstName: string;
    lastName: string;
    email: string;
    playerPhone: string;
    position: string;
  }
) => {
  const header = "Application: Ronz FC Academy Registration\n\n";

  const body = `Hello, I have submitted my application for the Ronz FC Academy trials/programs on the website.\n\nApplicant Details:\n` +
    `• Name: ${applicantDetails.firstName} ${applicantDetails.lastName}\n` +
    `• Email: ${applicantDetails.email}\n` +
    `• Phone: ${applicantDetails.playerPhone}\n` +
    `• Primary Position: ${applicantDetails.position}\n\n` +
    `Please let me know the next steps for evaluation and onboarding.\n\nThank you.`;

  const encodedMessage = encodeURIComponent(header + body);

  let cleanPhone = phone.replace(/[^\d+]/g, '');
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }
  const digitsOnlyPhone = cleanPhone.replace(/\D/g, '');

  return `https://wa.me/${digitsOnlyPhone}?text=${encodedMessage}`;
};
