    //********************************************************************************//
    //* Name : Oleg Mitrakhovich                                                     *//
    //* zenit login : int222_161a17                                                  *//
    //********************************************************************************//
    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //*   Note: This function also updates the payment amount on the form            *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
     }

} // End of detailPaymentCalculation function


function calculatePayment() {   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, present the client the following message in the       *//
    //*   reserved area on the form:                                                 *//
    //*                                                                              *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//
	   var mortAmount = "";
	   var mortDownPayment = "";
	   var mortRate = "";
	   var mortAmortization = "";
	   var output = document.getElementById("error");

	
	   if(formValidation() == false)
	   {	
	   output.value = "**Please complete the form first and then click on Calculate Monthly Payment**";	
	   }else{
	   mortAmount = document.forms["mortgage"]["propValue"].value;  	   
	   mortDownPayment = document.forms["mortgage"]["downPay"].value;
	   mortRate = document.forms["mortgage"]["intRate"].value;
	   mortAmortization = document.forms["mortgage"]["amortization"].value;
	   detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization);  	
	   }					

} // End of calculatePayment function



function formValidation() {

    //***************************************************************************************//
    //*                                                                                     *//
    //* This function calls the different functions to validate all required fields         *//
    //*                                                                                     *//
    //* Once you have called and validated all field, determine if any error(s)             *//
    //*  have been encountered                                                              *//
    //*                                                                                     *//
    //* If any of the required fields are in error:                                         *//
    //*                                                                                     *//
    //*    present the client with a list of all the errors in reserved area                *//
    //*         on the form and                                                             *//
    //*          don't submit the form to the CGI program in order to allow the             *//
    //*          client to correct the fields in error                                      *//
    //*                                                                                     *//
    //*    Error messages should be meaningful and reflect the exact error condition.       *//
    //*                                                                                     *//
    //*    Make sure to return false                                                        *//
    //*                                                                                     *//
    //* Otherwise (if there are no errors)                                                  *//
    //*                                                                                     *//
    //*    Recalculate the monthly payment by calling                                       *//
    //*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
    //*                                                                                     *//
    //*    Change the 1st. character in the field called client to upper case               *//
    //*                                                                                     *//
    //*    Change the initial value in the field called jsActive from N to Y                *//
    //*                                                                                     *//
    //*    Make sure to return true in order for the form to be submitted to the CGI        *//
    //*                                                                                     *//
    //***************************************************************************************//

       	var errMessages = "";

	errMessages = userId(errMessages);	
        errMessages = clientName(errMessages);
	errMessages = propValue(errMessages);
	errMessages = downPay(errMessages);
	errMessages = income(errMessages);
	errMessages = propLocation(errMessages);
	errMessages = propDetails(errMessages);
        errMessages = mortYear(errMessages);
	errMessages = mortMonth(errMessages);
	errMessages = intRate(errMessages);	
	errMessages = amortization(errMessages);

	if(errMessages !== ""){
		showErrors(errMessages);
		return false;
	}else{
		var x = document.forms["mortgage"]["client"].value;
		var y = document.forms["mortgage"]["client"].value;
		x = x.charAt(0).toUpperCase();
		x = x + y.substring(1);
		document.forms["mortgage"]["client"].value = x;
		document.forms["mortgage"]["jsActive"].value = "Y";
		return true;
	}	
			
	
		
	
	
	
	
} // End of completeFormValidation

function showErrors(errMessages){
	var output =  document.getElementById("error");

	output.value =  errMessages;
					
		
	}

function userId(errMessages){
                        var x = document.forms["mortgage"]["userId"].value;
                        var z = +x.charAt(5) + +x.charAt(6) + +x.charAt(7) + +x.charAt(8) + +x.charAt(9);
                        var z = z / 2 - 1;
                        var h = +x.charAt(0) + +x.charAt(1) + +x.charAt(2) + +x.charAt(3);
                        if (x == null || x == "" || x.length < 10){
                                errMessages += "**ID must be 10 characters long**\n";

                        }else if (x.charAt(4) != "-" ) {
                                errMessages += "**5th Character in ID must be a hyphen**\n";

                        }else if (isNaN(x.charAt(0)) || isNaN(x.charAt(1)) || isNaN(x.charAt(2)) || isNaN(x.charAt(3))  ){
                                errMessages += "**ID Must only include numbers**\n";

                        }else if (isNaN(x.charAt(5)) || isNaN(x.charAt(6)) || isNaN(x.charAt(7)) || isNaN(x.charAt(8)) || isNaN(x.charAt(9))  ){
                                errMessages += "**ID Must only include numbers, check 2nd half**\n";

                        }else if (+x.charAt(0) + +x.charAt(1) + +x.charAt(2) + +x.charAt(3) <= 0) {
                                errMessages += "**ID Must Be greater then Zero**\n";

                        }else if (+x.charAt(5) + +x.charAt(6) + +x.charAt(7) + +x.charAt(8) + +x.charAt(9) <= 0) {
                                errMessages += "**ID Must Be greater then Zero, check 2nd half**\n";

                        }else if ( +z !== +h ) {
                                errMessages += "**ID doesn't add up to right amount**\n";

			}else if (x.charAt(0) === ' '){
				errMessages += "**ID can not contain a space at the start**\n";
                        }else{
                                return errMessages;
                     }
				return errMessages;
                }

function clientName(errMessages){
    				var legalChar = 'abcdefghijklmnopqrstuvwxyz';
				var z = document.forms["mortgage"]["client"].value;
				var i = 0;
				var x = z.length;
				var msg = "";

				var k = 0;
                                var num = -1;
                                var l = -1;

                                while (k != -1){
                                k = z.indexOf('\'', l + 1);
                                num += 1;
                                l = k;
                                }

	                      
				if(z.indexOf('1') > -1 || z.indexOf('2') > -1 || z.indexOf('3') > -1 || z.indexOf('4') > -1 || z.indexOf('5') > -1 || z.indexOf('6') > -1 || z.indexOf('7') > -1 || z.indexOf('8') > -1 || z.indexOf('9') > -1
                                || z.indexOf('0') > -1 || z.indexOf('~') > -1 || z.indexOf('@') > -1 || z.indexOf('#') > -1 || z.indexOf('$') > -1 || z.indexOf('^') > -1 || z.indexOf('&') > -1 || z.indexOf('*') > -1 || z.indexOf('(') > -1
                                || z.indexOf(')') > -1 || z.indexOf('+') > -1 || z.indexOf('_') > -1 || z.indexOf('-') > -1 || z.indexOf('/') > -1 || z.indexOf('{') > -1 || z.indexOf('}') > -1 || z.indexOf(';') > -1 || z.indexOf('>') > -1
				|| z.indexOf('[') > -1 || z.indexOf(']') > -1 || z.indexOf('"') > -1 || z.indexOf('<') > -1 || z.indexOf('|') > -1 || z.indexOf('=') > -1 || z.indexOf('!') > -1 || z.indexOf('\\') > -1)
				{
	
		 	    	msg += "**Client Name Must only contain A-Z**\n";
			
				}
		  	   
				else if(z.length < 3)
				{
				msg += "**Client Name needs to be three or more characters**\n";
				}
	
				else if(z.charAt(0) === ' ')
				{
				msg += "**Client Name can not contain spaces at the start**\n";
				} 

				else if(z.charAt(x - 1) === ' ')
				{
                                msg += "**Client Name can not have a space at the end**\n";
				}
				
				else if(z.charAt(0) === '\'')
				{
				msg += "**Client Name Can not start with a apostrophe** \n";
				}	    
				
				else if(z.charAt(x - 1) === '\'')
				{
				msg += "**Client Name Can not end with a apostrophe** \n";
				}
			
				else if( num > 1)
				{
				 msg += "**Client Name Can only contain one apostrophe**\n";	
				}		
			
			errMessages += msg;
			return errMessages; 		
		}                  
               
function propValue(errMessages){

			    var z = document.forms["mortgage"]["propValue"].value;
			    var msg = "";
			    var x = z.length;

		            var y = document.forms["mortgage"]["downPay"].value;
                            var t = +z - +y;
	
			    if(z === "")
			    {
			    msg += "**Please Enter Property Value**\n";  	
			    }
			
            	            else if (z.indexOf(' ') > -1 )
			    {
			    msg+= "**Property Value must not include any spaces**\n";			    	
			    }
					   	
			    else if (isNaN(z))  
			    {
			    msg += "**Property Value must only be numeric**\n";			
			    }	

			
			    else if (z.indexOf('.') > -1)
			    {
			    msg += "**Property Value must be a whole Number**\n";
			    }

			    else if(+t < 65000)
			    {
			    msg += "**Property Value must be  65,000 more then downpayment**\n";
			    }
														   
		       errMessages += msg;
		       return errMessages;	
}

function downPay(errMessages){

			var z = document.forms["mortgage"]["downPay"].value;
			var msg = "";
		
			var y = document.forms["mortgage"]["propValue"].value;
                        var t = +y * 0.20;

			
			if(z === "")
			{
			msg += "**Please Enter Down Payment Value**\n";
			}

                 	else if (z.indexOf(' ') > -1 )
                        {
                        msg+= "**Down Payment Value must not include any spaces**\n";
                        }

		        else if (isNaN(z))
			{
			msg += "**Down Payment Value must only be Numeric**\n";
			} 
			
			else if (z.indexOf('.') > - 1)
			{
			msg += "**Down Payment Value must be a whole Number**\n";
			}

			
			else if (z < t)
			{
			msg += "**Down Payment Value must be atleast 20%**\n";
			} 	
				
		        errMessages += msg;
		        return errMessages;	
}

function income(errMessages){

			var z = document.forms["mortgage"]["income"].value;
			var msg = "";
			
			if(z === "Select Income")
			{
			msg += "**Please Select Income**\n";
			}

			else if(z === "")
			{
			msg += "**Please Select Income**\n";
			} 

			errMessages += msg;
			return errMessages;

}

function propLocation(errMessages){

			var z = document.forms["mortgage"]["propLocation"].value;
			var msg = "";

			if(z === "Select Location")
			{
			msg += "**Please Select Location**\n";
			}
			
			else if( z === "")
			{
			msg += "**Please Select Location**\n";
			}	
		
			errMessages += msg;
			return errMessages;

}

function propDetails(errMessages){
			
			var z = document.forms["mortgage"]["propDetails"].value;
			var msg = "";

			if(z === "")
			{
			msg += "**Please Select Property Details**\n";
			}

			errMessages += msg;
			return errMessages;
}

function mortYear(errMessages){
			var z = document.forms["mortgage"]["mortYear"].value;
			var msg = "";

			var myDate = new Date();
                        var myYear = myDate.getFullYear();


			if(z === "")
			{
			msg += "**Please Enter Mortgage Year**\n";
			}

			else if (z.indexOf(' ') > -1 )
                        {
                        msg+= "**Mortgage Year Value must not include any spaces**\n";
                        }

			
			else if (isNaN(z))
                        {
                        msg += "**Mortgage Year must only be Numeric**\n";
                        }
				
			else if (+z < myYear)
			{
			msg += "**Mortgage Year must be current**\n";
			} 

			else if(+z > myYear + 1)
			{
			msg += "**Mortgage Year must be no more then 1 year older**\n";
			}
			
			errMessages += msg;
			return errMessages;
}

function mortMonth(errMessages){
			var z = document.forms["mortgage"]["mortMonth"].value;
                        var msg = "";
			
			var myDate = new Date();
                        var myMonth = myDate.getMonth();
	
			if(z === "")
                        {
                        msg += "**Please Enter Mortgage Months**\n";
                        }

 			else if (z.indexOf(' ') > -1 )
                        {
                        msg+= "**Mortgage Month Value  must not include any spaces**\n";
                        }

                        else if (isNaN(z))
                        {
                        msg += "**Mortgage Months value must only be Numeric**\n";
                        }

			else if(z < myMonth + 1)
			{
			msg += "**Mortgage Month Must be Current**\n";
			}

			else if(z > myMonth + 2)
			{
			msg += "**Mortgage Month Must be only one month older**\n";
			}
			
			errMessages += msg;
			return errMessages;
}

function intRate(errMessages){

			var z = document.forms["mortgage"]["intRate"].value;
                        var msg = "";

			if(z === "")
                        {
                        msg += "**Please Enter interest rate**\n";
                        }
			
   			else if (z.indexOf(' ') > -1 )
                        {
                        msg+= "**Interest Rate Value must not include any spaces**\n";
                        }

                        else if (isNaN(z))
                        {
                        msg += "**Interest rate value must only be Numeric**\n";
                        }

			else if(z < 3)
			{
			msg += "**Interest rate can not be lower then 3**\n";
			}
			
			else if(z > 16)
			{
			msg += "**Interest rate can not be higher then 16**\n";
			}

			errMessages += msg;
			return errMessages;
}

function amortization(errMessages){
		     
			var z = document.forms["mortgage"]["amortization"].value;
                        var msg = "";
			
			if(z === "")
                        {
                        msg += "**Please Enter amortization**\n";
                        }
			
			else if (z.indexOf(' ') > -1 )
                        {
                        msg+= "**Amortization Value must not include any spaces**\n";
                        }

                        else if (isNaN(z))
                        {
                        msg += "**Amortization value must only be Numeric**\n";
                        }

			else if(z < 5)
                        {
                        msg += "**Amortization can not be lower then 5**\n";
                        }

                        else if(z > 20)
                        {
                        msg += "**Amortization can not be higher then 20**\n";
                        }


			errMessages += msg;
			return errMessages;

}
