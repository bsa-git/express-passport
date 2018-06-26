const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const myEmail = process.env.MY_EMAIL;


/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
    const unknownUser = !(req.user);

    res.render('contact', {
        title: 'Contact',
        unknownUser,
    });
};

/**
 * POST /contact
 * Send a contact form via SendGrid.
 */
exports.postContact = (req, res) => {
    let fromName;
    let fromEmail;
    if (!req.user) {
        req.assert('name', 'Name cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
    }
    req.assert('message', 'Message cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/contact');
    }

    if (!req.user) {
        fromName = req.body.name;
        fromEmail = req.body.email;
    } else {
        fromName = req.user.profile.name || '';
        fromEmail = req.user.email;
        if(!fromEmail){
            req.flash('errors', {msg: 'Field fromEmail cannot be blank. Enter the email address in your profile.'});
            return res.redirect('/contact');
        }
    }

    const mailOptions = {
        to: myEmail,
        from: `${fromName} <${fromEmail}>`,
        subject: 'Contact Form | Hackathon Starter',
        text: req.body.message
    };

    sgMail.send(mailOptions);
    req.flash('success', {msg: 'Email has been sent successfully!'});
    res.redirect('/contact');
};
