//Получаем число пи
const pi = Math.PI;
//Получаем значение 1% высоты окна браузера в пикселях
const h = $(window).height()/100; 
//Получаем значение 1% длины окна браузера в пикселях
const w = $(window).width()/100;  
//Получаем значение 100% высоты окна браузера в пикселях
const hFull = h*100;
//Получаем значение 100% длины окна браузера в пикселях
const wFull = w*100;
//Тип холста
const ctx = canvas.getContext('2d');
canvas.width = wFull/8;
canvas.height = hFull/3.9
//Ширина холста
const cwidth = canvas.width;
//Высота холста
const cheight = canvas.height;
//То, что потом удалится
const letters = document.getElementById('letters');
//Массив игровых слов
const mas = 'автобус апельсин арбуз бутылка ворота горох дерево доска звезда кабель камера каша квалификация клавиатура кнопка ковёр колонки комиссия коробка космос куртка мышка наушники номер окно объём открытка панель портрет портфель потолок рандом реклама розетка ручка скатерть скважина ступенька таблетка тетрадь университет учебник шахта шторы щёлок этаж юнга юшка яство ясли'.split(' ');//46 слов
//Описание к словам
const wordDescription = {
	'автобус':'Автомобиль-омнибус.',
	'апельсин':'Гибрид мандарина и помело.',
	'арбуз':'Самая большая ягода.',
	'бутылка':'Ёмкость для хранения и переноса жидкости.',
	'ворота':'Проезд в стене или ограде, запираемый створами.',
	'горох':'Однолетнее травянистое растение, принадлежащее к семейству бобовых.',
	'дерево':'Многолетнее растение с твердым стволом.',
	'доска':'Плоский с обеих сторон кусок дерева.',
	'звезда':'Массивное самосветящееся небесное тело, состоящее из газа или плазмы.',
	'кабель':'Один из видов линий передачи, защищённый провод.',
	'камера':'Изолированная комната специального назначения.',
	'каша':'Варёная крупа.',
	'квалификация':'Процесс оценки уровня знаний, степень компетентости.',
	'клавиатура':'Устройство ввода.',
	'кнопка':'Элементарный физический/визуальный механизм передачи сигнала.',
	'ковёр':'Одно из древнейших изобретений для декорирования и утепления любого дома.',
	'колонки':'Акустическая система.',
	'комиссия':'Группа лиц или орган из группы лиц со специальными полномочиями.',
	'коробка':'Негерметичная ёмкость в форме параллелепипеда.',
	'космос':'Пространство за пределами планетарных атмосфер.',
	'куртка':'Верхняя одежда, наглухо застёгивающаяся.',
	'мышка':'Внешнее координаторное устройство компьютера.',
	'наушники':'Электроакустические преобразователи, надетые на голову.',
	'номер':'Уникальный числовой код, порядковое число объекта.',
	'окно':'Прозрачный проём в стене.',
	'объём':'Количественная характеристика пространства, занимаемого телом.',
	'открытка':'Важный полиграфический элемент, который часто используется для поздравлений.',
	'панель':'Группа приборов и органов управления, совмещённая в одной конструкции.',
	'портрет':'Изображение или описание какого-либо человека либо группы людей, жанр изобразительного искусства.',
	'портфель':'Сумка для переноски бумаг, книг, тетрадий и прочих вещей.',
	'потолок':'Плоскость, ограничивающая помещение сверху.',
	'рандом':'Слово, характеризующее случайность в английском языке.',
	'реклама':'Однонаправленная форма неличной коммуникации, осуществляемая на платной основе с целью привлечения внимания.',
	'розетка':'Стационарно установленный разъём электрических сетей.',
	'ручка':'Письменная принадлежность для записи информации.',
	'скатерть':'Предмет столового белья.',
	'скважина':'Глубокое отверстие, диаметр сечения которого намного меньше длины.',
	'ступенька':'Звено лестницы.',
	'таблетка':'Твёрдая дозированная лекарственная форма.',
	'тетрадь':'Письменный носитель информации, состоящий из скреплённых листов бумаги.',
	'университет':'Заведение, осуществляющее подготовку специалистов с высшим профессиональным образованием.',
	'учебник':'Книга, содержащая систематическое изложение знаний в определённой области.',
	'шахта':'Промышленное предприятие, осуществляющее добычу с помощью системы подземных горных выработок.',
	'шторы':'Оконная занавесь, раздвигаемая в стороны или поднимаемая вверх.',
	'щёлок':'Раствор древесной золы, использующийся для стирки.',
	'этаж':'Часть пространства здания между полом и потолком.',
	'юнга':'Подросток на судне, готовящийся в матросы.',
	'юшка':'Жидкая часть блюда.',
	'яство':'Обильные, вкусные, изысканные кушанья (устар.)',
	'ясли':' Кормушка для скота, прикрепляемая наклонно к стене.'	
};
const clickSound = new Audio('clickSound.m4a')
//Рандомный выбор слова из списк
const word = mas[Math.floor(Math.random()*mas.length)];
//Сколько букв в массиве
let word_len = word.length;
//Игровой массив
const game_mas = [];
//Добавление в игровой массив '_'
for(let i in word){
	game_mas[i] = '_';
}
//Жизни
let lives = 6;
//Словарь с ассоциацией английских букв на русские
const key_assoc_eng = {
	'f':'а',
	',':'б',
	'd':'в',
	'u':'г',
	'l':'д',
	't':'е',
	'`':'ё',
	';':'ж',
	'p':'з',
	'b':'и',
	'q':'й',
	'r':'к',
	'k':'л',
	'v':'м',
	'y':'н',
	'j':'о',
	'g':'п',
	'h':'р',
	'c':'с',
	'n':'т',
	'e':'у',
	'a':'ф',
	'[':'х',
	'w':'ц',
	'x':'ч',
	'i':'ш',
	'o':'щ',
	']':'ъ',
	's':'ы',
	'm':'ь',
	"'":'э',
	'.':'ю',
	'z':'я'
}
//Строки (массивы) с английскими и русскими символами
const eng = "abcdefghijklmnopqrstuvwxyz,`;[]\\.'";
const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
//Получить то, что на экране
const word_on_screen = document.getElementById('word');
const lives_on_screen = document.getElementById('lives');
//Задержка для избежания случайных нажатий с клавиатуры
setTimeout(() => {
	//Обработка букв с клавиатуры + ассоцияция англ раскладки
	document.onkeyup = function(button){
		if (eng.indexOf(button.key) != -1){
			main(key_assoc_eng[button.key]);
		}
		else if (rus.indexOf(button.key) != -1){
					main(button.key);
		}
	}
}, 400);
//Вывод информации в начале
word_on_screen.innerHTML = game_mas.join(' ');
lives_on_screen.innerHTML = 'Попытки: ' + lives + '.';
info.innerHTML = 'Вам осталось отгадать ' + word_len + ' букв.';
//Основная функция, обрабатывающая ответ
function main(letter){
	clickSound.play();
	if(lives > 0 && game_mas.indexOf('_') != -1){
		//Есть ли уже такая буква?
		if (game_mas.indexOf(letter) !== -1){
			lives--;
			lives_on_screen.innerHTML = 'Попытки: ' + lives + '. Такая буква уже есть.';
			//Создание кнопки
			if(lives == 2){
				let place = document.querySelector('.hintPlace');
				let hint = document.createElement('a');
				place.appendChild(hint);
				hint.id = 'btn';
				hint.innerText = "Подсказка";
				hint.onclick = function(){
					alert(wordDescription[word]);
				}
			}
		}
		//Если правильно
		else if (word.indexOf(letter) != -1){
			for (i = 0; i < word.length; i++){
				if (word[i] == letter){
					game_mas[i] = letter;
					word_len--;
				}
			}
			document.addEventListener('click', function changeColorOnClick(event){
				event.target.style.color = 'lime';
				console.log(event.target)
				this.removeEventListener('click', changeColorOnClick);
			})
			lives_on_screen.innerHTML = 'Попытки: ' + lives + '. Вы отгадали букву "' + letter + '"!';
		}
		//Если неправильно
		else{
			lives--;
			lives_on_screen.innerHTML = 'Попытки: ' + lives + '. Нет такой буквы!';
			//Создание кнопки
			if(lives == 2){
				let place = document.querySelector('.hintPlace');
				let hint = document.createElement('a');
				place.appendChild(hint);
				hint.id = 'btn';
				hint.innerText = "Подсказка";
				hint.onclick = function(){
					alert(wordDescription[word]);
				}
			}
			document.addEventListener('click', function changeColorOnClick(event){
				event.target.style.color = 'red';
				this.removeEventListener('click', changeColorOnClick);
			})
		}
		//Обновление статуса загаданного слова
		word_on_screen.innerHTML = game_mas.join(' ');
		info.innerHTML = 'Вам осталось отгадать ' + word_len + ' букв.';
	}
	//Обработка проигрыша
	if (lives < 1){
		info.innerHTML = 'Увы, попытки исчерпаны. Загаданное слово: "' + word + '".';
		word_on_screen.innerHTML = '';
		letters.remove();
		for(i in word)
			if(game_mas[i] != '_'){
				word_on_screen.innerHTML += '<span class="green">'+ game_mas[i] +'</span>';
			}
			else{
				word_on_screen.innerHTML += '<span class="red">'+ word[i] +'</span>';
			}
		//Грустный смайлик 
		//КРУГ
		ctx.fillStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(cwidth/2, cheight/2, (wFull + hFull)/25, 0, pi * 2);
		ctx.closePath();
		ctx.lineWidth = (wFull + hFull)/350;
		ctx.stroke();
		ctx.fill();
		//ЛЕВЫЙ ГЛАЗ
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(cwidth/4, cheight/3, (wFull + hFull)/170, 0, pi * 2);
		ctx.closePath();
		ctx.fill();
		//ПРАВЫЙ ГЛАЗ
		ctx.beginPath();
		ctx.arc(cwidth/1.3, cheight/3, (wFull + hFull)/170, 0, pi * 2);
		ctx.closePath();
		ctx.lineWidth = (wFull + hFull)/350;
		ctx.fill();
		//РОТ "("
		ctx.beginPath();
		ctx.arc(cwidth/1.95, cheight/1.15, (wFull + hFull)/55, -13.2, pi*1.2, true);
		ctx.stroke();
	}
	//Обработка выйгрыша
	else if(word_len < 1){
		info.innerHTML = 'Вы молодец! Вы отгадали слово \"' + word + '\"!'
		word_on_screen.innerHTML = '';
		letters.remove();
		for (i in word){
			word_on_screen.innerHTML += '<span class="green">'+ game_mas[i] +'</span>';
		}
		//Весёлый смайлик
		//КРУГ
		ctx.fillStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(cwidth/2, cheight/2, (wFull + hFull)/25, 0, pi * 2);
		ctx.closePath();
		ctx.lineWidth = (wFull + hFull)/350;
		ctx.stroke();
		ctx.fill();
		//ЛЕВЫЙ ГЛАЗ
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(cwidth/4, cheight/3, (wFull + hFull)/170, 0, pi * 2);
		ctx.closePath();
		ctx.fill();
		//ПРАВЫЙ ГЛАЗ
		ctx.beginPath();
		ctx.arc(cwidth/1.3, cheight/3, (wFull + hFull)/170, 0, pi * 2);
		ctx.closePath();
		ctx.lineWidth = (wFull + hFull)/350;
		ctx.fill();
		//РОТ ")"
		ctx.beginPath();
		ctx.arc(cwidth/1.95, cheight/1.7, (wFull + hFull)/60, 0.3, pi/1.1, false);
		ctx.stroke();
	}
}