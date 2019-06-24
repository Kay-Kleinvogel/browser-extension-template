window.addEventListener('load', function load(event) {
	// setting the current timestamp
	document.getElementById('current_timestamp_value').innerText = parseInt(
		Date.now() / 1000
	);

	// sending the form through enter key
	document
		.getElementById('timestamp_input')
		.addEventListener('keypress', function(e) {
			if (e.keyCode === 13) {
				var unix_timestamp = document.getElementById('timestamp_input').value;
				clicked(unix_timestamp);
			}
		});

	// make the output clickable
	document
		.getElementById('clipboard_input')
		.addEventListener('click', function(e) {
			var t = document.getElementById('timestamp_input');
			t.value = '';
			t.focus();
			document.execCommand('paste');
			var unix_timestamp = t.value;
			clicked(unix_timestamp);
		});

	let elementsArray = document.querySelectorAll('.output_value');

	elementsArray.forEach(function(elem) {
		elem.addEventListener('click', function() {
			var copyText = elem;
			var textArea = document.createElement('textarea');
			textArea.value = copyText.textContent;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('Copy');
			textArea.remove();
		});
	});
});

function clicked(unix_timestamp) {
	// getting the parts of the date
	var date = new Date(unix_timestamp * 1000);
	var year = leading_zero(date.getUTCFullYear());
	var month = leading_zero(date.getUTCMonth());
	var day = leading_zero(date.getUTCDate());
	var hour = leading_zero(date.getUTCHours());
	var minute = leading_zero(date.getUTCMinutes());
	var second = leading_zero(date.getUTCSeconds());
	var time = 'T' + hour + ':' + minute + ':' + second;

	// updating the html
	document.getElementById('timestamp_input').innerText = unix_timestamp;

	document.getElementById(
		'iso_string_value'
	).innerText = date.toISOString().slice(0, -5);

	document.getElementById('dd/mm/yyyy_value').innerText =
		day + '/' + month + '/' + year + time;

	document.getElementById('mm/dd/yyyy_value').innerText =
		month + '/' + day + '/' + year + time;

	document.getElementById('yyyy/mm/dd').innerText =
		year + '/' + month + '/' + day + time;
}

function leading_zero(input_string) {
	if (input_string < 9) {
		return '0' + input_string;
	}
	return String(input_string);
}
