$.validator.addMethod("regex", function (value, element, regexpr) {
    //If is only for flx-tags
    let parentElement = ($(element).parent() ? $(element).parent().parent() : null);
    if (parentElement.length > 0 && parentElement[0].nodeName === 'FLX-TAG') {
        let tagValues = parentElement[0].getValue();
        if (tagValues) tagValues = tagValues.split(parentElement[0].getSeparator());
        else return true;

        let regExpression = new RegExp(regexpr)
        for (let i = 0; i < tagValues.length; i++) {
            if (!regExpression.test(tagValues[i])) return false;
        }
        return true;
    } else {
        if (value == null || value == '') { return true;}
        return (new RegExp(regexpr)).test(value);
    }
}, "Please enter a valid value.");

$.validator.addMethod("sqlvalidator", function (value, element, validated) {
    if (validated == 0) {
        $.validator.messages.sqlvalidator = element.getAttributeNode("data-msg-sqlvalidator").value;
        return false;
    }
    return true;
});

$.validator.methods.step = function (value, element, param) {
    // Replace default Jquery step validation
    var type = $(element).attr("type"),
        errorMessage = "Step attribute on input type " + type + " is not supported.",
        supportedTypes = ["text", "number", "range"],
        re = new RegExp("\\b" + type + "\\b"),
        notSupported = type && !re.test(supportedTypes.join());
    if (notSupported) {
        throw new Error(errorMessage);
    }
    return this.optional(element) || true; //(value % param === 0);
};

$.validator.methods.email = function (value, element) {



    // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    // Retrieved 2014-01-14
    // If you have a problem with this implementation, report a bug against the above spec
    // Or use custom methods to implement your own email validation
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);

}

$.validator.methods.maxlength = function (value, element) {
    // If there is no value, the field is valid
    if (!value) {
        return true;
    }

    // Get maxlength from HTML attribute
    var maxLength = $(element).attr('maxlength');

    // If maxlength is not defined, do not validate
    if (!maxLength) {
        return true;
    }

    maxLength = parseInt(maxLength, 10);

    // If the element is a textarea, apply line break replacement
    // Convert '\n' (1 char) into '\r\n' (2 chars)
    if (element.tagName.toLowerCase() === 'textarea') {
        value = flexygo.utils.parser.replaceAll(flexygo.utils.parser.replaceAll(value, '\r', ''), '\n', '\r\n');
    }

    // Validate final length against maxlength
    return value.length <= maxLength;
};
