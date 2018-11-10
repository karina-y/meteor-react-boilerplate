import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = "TODOBOILER_appName Inc.";
Accounts.emailTemplates.from     = "TODOBOILER_appName <support@TODOBOILER_appDomain.com>";
Accounts.emailTemplates.baseUrl  = "http://www.TODOBOILER_appdomain.com/";



Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "TODOBOILER_appName - Verify Your Email Address";
    },
    html( user, url ){
        let data = {
            baseUrl: Accounts.emailTemplates.baseUrl,
            emailAddress: user.emails[0].address,
            verifyUrl: url.replace( '#/','' ),
            supportEmail: "support@TODOBOILER_appDomain.com",
        };

        SSR.compileTemplate('htmlEmail', Assets.getText('email_templates/user_signup.html'));
        let body = SSR.render('htmlEmail', data);
        //console.log(data);

        return body;

    }
};

Accounts.emailTemplates.resetPassword = {
    subject() {
        return "TODOBOILER_appName - Reset your password"
    },
    html( user, url ){
        let data = {
            baseUrl: Accounts.emailTemplates.baseUrl,
            emailAddress: user.emails[0].address,
            resetUrl: url.replace( '#/','' ),
            supportEmail: "support@TODOBOILER_appDomain.com",
        };

        SSR.compileTemplate('htmlEmail', Assets.getText('email_templates/password_reset.html'));
        let body = SSR.render('htmlEmail', data);

        return body;

    }
};

Accounts.emailTemplates.enrollAccount = {
    subject() {
        return "Welcome To TODOBOILER_appName!";
    },
    html( user, url ){
        let data = {
            baseUrl: Accounts.emailTemplates.baseUrl,
            emailAddress: user.emails[0].address,
            verifyUrl: url.replace( '#/','' ),
            supportEmail: "support@TODOBOILER_appDomain.com",
            headerTitle: "Welcime!"
        };
        data.verifyUrl = data.verifyUrl.replace( 'enroll-account','reset-password' );

        SSR.compileTemplate('htmlEmail', Assets.getText('email_templates/welcome-back-company.html'));
        let body = SSR.render('htmlEmail', data);

        return body;

    }
};
