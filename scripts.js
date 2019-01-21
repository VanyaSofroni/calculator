'use strict';

(function () {

	var calcContainer = document.querySelector('.calculator__kays'); 
	var screen = document.querySelector('.calculator__screen');
	var equals = document.querySelector('.equals');
	var clear = document.querySelector('.clear');

	var nums = document.querySelectorAll('.num');
	var ops = document.querySelectorAll('.operator');

	var theNum = ''; // Текущее число
  var oldNum = ''; // Первое введеное число
  var resultNum; // Результат
  var operator; // Batman

  // Если нажали на кнопку num, отобразить текущий номер
  var setNum = function(target) {
    if (resultNum) { // Если результат уже отображен на экране, сбросить
      theNum = target.getAttribute('data-num');
      resultNum = '';
    } else { // Иначе, добавить число в текущее
      theNum += target.getAttribute('data-num');
    }

    screen.innerHTML = theNum; // Отобразить текущее число
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  // Передать номер в oldNum, сохранить оператор
  var moveNum = function(target) {
    oldNum = theNum;
    theNum = '';
    operator = target.getAttribute('data-operator');

    equals.setAttribute('data-result', ''); // Скинуть результат в аттребуте
  };

  // Очистить все
  var clearAll = function() {
    oldNum = '';
    theNum = '';
    screen.innerHTML = '0';
    equals.setAttribute('data-result', resultNum);
  };

  // Основная логика. Расчет результа и вывод его на экран
  var displayNum = function() {

    // Конвертация String в Number
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Посчитать, в зависимости от нажатого оператора
    switch (operator) {
      case 'plus':
        resultNum = oldNum + theNum;
        break;

      case 'minus':
        resultNum = oldNum - theNum;
        break;

      case 'add':
        resultNum = oldNum * theNum;
        break;

      case 'percentage':
        resultNum = oldNum % theNum;
        break;

      case 'divided-by':
        resultNum = oldNum / theNum;
        break;

        // Если оператор не ввели, занести в результат текущее число
      default:
        resultNum = theNum;
    };

    // Если NaN or Infinity вернул
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // Если результат не число. Засчитывается например двойным щелчком по оператору
        resultNum = 'Потрачено!';
      } else { // Если результа бесконечность. Засчитывается при делении на ноль 
        resultNum = 'Недопустимо, перезагрузите';
      }
    }

    // Вывод результата на экран и запись в атрибут data-result
    screen.innerHTML = resultNum;
    equals.setAttribute('data-result', resultNum);

    // Сбросить первое введеное число, а вместо текущего записать результат
    oldNum = 0;
    theNum = resultNum;
  };

	calcContainer.addEventListener('click', function(e) {
		var target = e.target;
		var num = target.classList.contains('num');
		var op = target.classList.contains('operator');

		if (!num && !op) return;

		if (num) {
			setNum(target)
		} else if (op) {
			moveNum(target)
		}
	});

  equals.addEventListener('click', displayNum);
  clear.addEventListener('click', clearAll);

})();