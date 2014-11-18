"use strict";

function load() {
	var selectState = document.getElementsByName("state");
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.text = usStates[i].name;
		opt.value = usStates[i].code;
		selectState[0].appendChild(opt);
	}

	var other = document.getElementById("occupation");
	function inputOccupation() { 
		var style = document.getElementsByName("occupationOther");
		var temp = document.getElementById("occupation").value;
		if(temp == "other") {
			style[0].style.display = "inline";
		} else {
			style[0].style.display = "none";
		}
	}
	other.addEventListener('change', inputOccupation);

	var noThanks = document.getElementById("cancelButton");
	function decide() {
		var redirect = window.confirm("BABY COME BACK, YOU CAN BLAME IT ALL ON MEEEEEE");
		if(redirect) {
			window.location.replace("http://google.com");
		}
	}
	noThanks.addEventListener('click', decide);

	var signUp = document.getElementById('signup');
	signUp.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
    var valid;
    try {
		valid = validate(this);
	} catch(exception) {
		console.log(exception);
		valid = false; 
	}
	if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
} 

function validate(form) {
    var required = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var valid = true;
    var index;
    if (document.getElementsByName('occupationOther')[0].style.display == 'inline') {
		required.push('occupationOther');
	}
	for(index = 0; index < required.length; index++) {
		valid = validateForm(required[index], form);
	}
	return valid;
}


function validateForm(field, form) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var age = 13;
	var old = true;
	var realZip = true;
	if(field === 'zip') {
		var ziptest = zipRegExp.test(form[field].value);
		if(!ziptest) {
			realZip = false;
		}
	}
	if(field === 'birthdate') {
		var birthday = new Date(form[field].value);
		var currentDate = new Date();
		var yearDifference = currentDate.getFullYear() - birthday.getFullYear();
		var monthDifference = currentDate.getMonth() - birthday.getMonth();
		if(currentDate.getDate() <= birthday.getDate() && monthDifference === 0 || monthDifference < 0) {
			yearDifference = yearDifference - 1;
		}
		if(yearDifference < age) {
			old = false;
		}
	}
	if(form[field].value.trim().length === 0 || field === 'zip' && !realZip || field === 'birthdate' && !old) {
	    form[field].className = 'form-control invalid-field';
	    if(field === 'birthdate' && !old) {
			document.getElementById("birthdateMessage").innerHTML = 'Sorry, you must be 13 years of age to sign up';
	    }
	    if(field === 'zip' && !realZip) {
	    	document.getElementById("zipMessage").innerHTML = 'Must be 5 digits!';
	    }
	    return false;
	} else {
		form[field].className = 'form-control';
		if(old === true) {
			document.getElementById("birthdateMessage").innerHTML = '';
	    }
	    if(realZip === true) {
	    	document.getElementById("zipMessage").innerHTML = '';
	    }
	    return true;
	}
}
document.addEventListener('DOMContentLoaded', load);
