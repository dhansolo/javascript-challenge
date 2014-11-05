"use strict";

function load() {
	var selectState = document.getElementsByName("state");
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("OPTION");
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
    var valid = true;
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    try {
		valid = validate(this);
	} catch(exception) {
		console.log(exception);
		valid = false; 
	}
    evt.returnValue = valid;
    return valid;
} 

//
function validate(form) {
    var required = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var index;
    var valid = true;
    if (document.getElementsByName('occupationOther')[0].style.display == 'inline') {
		required.push('occupationOther');
	}
    for(index = 0; index < required.length; index++) {
    	var input = document.getElementsByName(required[index])[0];
        if(input.value === "") {
        	input.className = 'form-control invalid-field';
        	valid = false;
       	} else {
       		input.className = 'form-control';
       	}
       	if(input === 'zip') {
       		var zipRegExp = new RegExp('^\\d{5}$');
       		if(!zipRegExp.test(input.value)) {
       			input.className = 'form-control invalid-field';
       			valid = false;
       		} else {
       			input.className = 'form-control';
       		}
       	}
       	if(input === 'birthdate') {
       		var birthday = new Date(input.value);
       		var currentDate = new Date();
       	 	if (input.value === "") {
				input.className = 'form-control invalid-field';
				valid = false;
			} else if (!(currentDate.getDay() <= birthday.getDay() && currentDate.getMonth() <= birthday.getMonth() && currentDate.getFullYear() - 13 >= birthday.getFullYear())) {
				document.getElementById('birthdateMessage').innerHTML = "Must be 13 years of age";
				document.getElementById('birthdateMessage').className = '';
				input.className = 'form-control invalid-field';
				valid = false;
			} else {
				document.getElementById('birthdateMessage').innerHTML = "";
				document.getElementById('birthdateMessage').className = "";
				input.className = 'form-control';
			}
       	}
    }
    return valid;
}
document.addEventListener('DOMContentLoaded', load);
