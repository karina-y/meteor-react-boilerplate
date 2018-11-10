import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import _ from 'underscore';

const GLOBAL_DATA = {
    from: 'support@TODOBOILER_appDomain.com',
    baseUrl: Meteor.absoluteUrl()
};

/* 
	USAGE
		
		sendHtmlEmail(<to>,<subject>,<data>,<template>,[subTemplate])

	DETAIL

		to			email address of recipient
		subject		subject line for email
		data		object with key/value pairs for templates
		template	main template for the email
						- Must have {{{ body }}} tag if subTemplate is provided
		subTemplate (optional) html template that will be injected into template's {{{ body }}}
					tag
*/
export default function sendHtmlEmail(to,subject,data,template,subTemplate=null) {

    console.log("sendHtmlEmail Args: ",to,subject,'data',template,subTemplate);

    _.extend(data,GLOBAL_DATA);

    if( subTemplate ){
        SSR.compileTemplate('subTmpl', Assets.getText('email_templates/' + subTemplate + '.html'));
        let body = SSR.render('subTmpl', data);
        _.extend(data,{body:body});
    }

    if (template) {
        SSR.compileTemplate('htmlEmail', Assets.getText('email_templates/' + template + '.html'));
    }

    // console.log(SSR.render('htmlEmail', data));
    try {
        Email.send({
            to: to,
            from: GLOBAL_DATA.from,
            subject: subject,
            html: SSR.render('htmlEmail', data)
        });
        return true;
    } catch (exception) {
        return false;
    }
}
