document.addEventListener("DOMContentLoaded", function() {
        
	String.prototype.replaceAt = function(index, replacement) {
		if (index >= this.length) return this.valueOf();
		return this.substring(0, index) + replacement + this.substring(index + 1);
	}
	
	var alphabets = {
		'en' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		'uk' : 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
	};
	
	
	function crypt(text, key, alphabet, mode) {
		text = text.length < key.length ? text.substr(0, (key.length-1)) : text;
		result = text;
		console.log(text);
		console.log(key);
		console.log(alphabet);
		console.log(mode);
		var alphabet_upper = alphabet;	
		var alphabet_lower = alphabet_upper.toLowerCase();
		var key_upper = key.toUpperCase();
		var key_lower = key.toLowerCase();
		
		var ki = 0;
		for (let i = 0; i < text.length; i++){
			ind_t_1 = alphabet_upper.indexOf(text.charAt(i));
			ind_t_2 = alphabet_lower.indexOf(text.charAt(i));
			if (ind_t_1 > -1) {
				ind_k_1 = alphabet_upper.indexOf(key_upper.charAt(ki));
				ind_k_1 = ( (typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1) ? (-ind_k_1) : ind_k_1 );
				repl = alphabet_upper.charAt( ( ( alphabet_upper.length + ( ind_t_1 + ind_k_1 ) ) % alphabet_upper.length ) );
				result = result.replaceAt(i, repl);
				ki++;
				ki = ki >= key_upper.length ? 0 : ki;
			} else 
			if (ind_t_2 > -1) {
				ind_k_2 = alphabet_lower.indexOf(key_lower.charAt(ki));
				ind_k_2 = ( (typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1) ? (-ind_k_2) : ind_k_2 );
				repl = alphabet_lower.charAt( ( ( alphabet_lower.length + ( ind_t_2 + ind_k_2 ) ) % alphabet_lower.length ) );
				result = result.replaceAt(i, repl);
				ki++;
				ki = ki >= key_lower.length ? 0 : ki;
			}
		}
		
		return result;
	}
	$('#submit-button').on('click',function(){
		var text  = $('#InText').val().substring(0, 20000);
		var key = $('#InKey').val();
		var action = $('input[name=choice]:checked').val();
		// var alph  = alphabets[$('#alphabet').val()];
		var alph  = alphabets[$('#alphabet').val()];
		if (text.length >= 1 && key.length >= 1) {
			if($('#alphabet').val() == "en") {
				result = crypt(text, key, alph, action);
				res =  '<h2 style="text-align: center;">Результат:</h2>' +
						'<img src="https://programm.top/images/vigenere-table.png" alt="Vigenere-Table-English" width=250px height=250px>' +
						'<div class="result-wrapper">'+
						'<div class="result-text">Отримали текст: '+result+'</div>'
						+'</div>';
				$('#result').html(res);
				if (action == "encrypt") {
					var act2 = "decrypt";
					var r = result;
					dec = crypt(r, key, alph, act2);
					reslog = res + '<div class="result-text-decrypt">Розшифрований текст: '+dec+'</div>'
					+'</div>';
					$('#result').html(reslog);
				}
			}
			if($('#alphabet').val() == "uk") {
				result = crypt(text, key, alph, action);
				res =  '<h2 style="text-align: center;">Результат:</h2>'+ 
				'<img src="https://teteryakv12.files.wordpress.com/2014/10/d0b2d0bfd0b0d0bfd0b0d0bf.jpg" alt="Vigenere-Table-English">' +
					'<div class="result-wrapper">'+
							'<div class="result-text">Отримали текст: '+result+'</div>'
							+'</div>';
				$('#result').html(res);
				if (action == "encrypt") {
					var act2 = "decrypt";
					var r = result;
					dec = crypt(r, key, alph, act2);
					reslog = res + '<div class="result-text-decrypt">Розшифрований текст: '+dec+'</div>'
					+'</div>';
					$('#result').html(reslog);
				}
			}

		}
	});
	$('body').on('keyup focus', '#input-area', function(){
		document.getElementById("input-area").style.height = "5px";
		document.getElementById("input-area").style.height = (parseInt(document.getElementById("input-area").scrollHeight)+10)+"px";
	});
	
});