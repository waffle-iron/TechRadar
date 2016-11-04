(function(exports){

    exports.validateTagName = function (name) {
        const MIN_NAME_LENGTH = 2;
        const MAX_NAME_LENGTH = 32;
        
        if(name==undefined || name.length < MIN_NAME_LENGTH ) {
            return { valid: false, message: "Tag name too short. At least " 
                + MIN_NAME_LENGTH + " characters are required" 
            };
        }

        if( name.length > MAX_NAME_LENGTH) {
            return { valid: false, message: "Tag name can't contain more than " 
                + MAX_NAME_LENGTH + " characters" 
            };
        }
        return { valid: true };
    };

})(typeof exports === 'undefined'? this['TagValidator']={}: exports);