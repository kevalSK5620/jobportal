export const generateApplicationStatusEmail = (applicantName, jobTitle, companyName, recruiterName, recruiterEmail, status) => {
    const getStatusMessage = (status) => {
        switch (status) {
            case 'accepted':
                return `
                    <p>Thank you for taking the time to apply for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>. We appreciate your interest in joining our team and the effort you put into your application.</p>
                    <p>We are pleased to inform you that after careful review of all applications, we have selected you as the candidate whose experience and qualifications best match our requirements.</p>
                    <p>Our HR team will be in touch with you shortly to discuss the next steps in the process and provide further details about joining our team.</p>
                    <p>We look forward to having you as part of our organization.</p>
                `;
            case 'rejected':
                return `
                    <p>Thank you for taking the time to apply for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>. We appreciate your interest in joining our team and the effort you put into your application.</p>
                    <p>After careful review of all applications, we have selected a candidate whose experience and qualifications best match the requirements of the position.</p>
                    <p>We truly value your interest and encourage you to apply for future openings that match your skills and experience.</p>
                    <p>Wishing you the very best in your job search and career ahead.</p>
                `;
            default:
                return `
                    <p>Thank you for taking the time to apply for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>. We appreciate your interest in joining our team and the effort you put into your application.</p>
                    <p>Your application is currently under review. We will carefully evaluate your qualifications and experience.</p>
                    <p>We will keep you updated on any changes to your application status.</p>
                    <p>Thank you for your patience during our review process.</p>
                `;
        }
    };

    return {
        subject: `Job Application Update – ${jobTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Job Application Status Update</h2>
                <p>Dear ${applicantName},</p>
                ${getStatusMessage(status)}
                <div style="margin-top: 30px;">
                    <p style="margin: 0;">Warm regards,</p>
                    <p style="margin: 5px 0;">${recruiterName}</p>
                    <p style="margin: 0;"><strong>${companyName}</strong></p>
                    <p style="margin: 5px 0; color: #666;">${recruiterEmail}</p>
                </div>
            </div>
        `
    };
};
