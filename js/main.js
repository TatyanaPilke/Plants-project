// burger menu
document.addEventListener('DOMContentLoaded', () => {

  //Mobile Menu
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.menu');
  const bodyLock = document.querySelector('body');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu--active');
    if (mobileMenu.classList.contains('menu--active')) {
      burger.classList.add('burger--active');
      bodyLock.classList.add('lock');
    } else {
      burger.classList.remove('burger--active');
      bodyLock.classList.remove('lock');
    }
  });

  const menuLinks = document.querySelectorAll('.menu__link');
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
      mobileMenu.classList.remove('menu--active');
      burger.classList.remove('burger--active');
      bodyLock.classList.remove('lock');
    });
  }
});

const selectSingle = document.querySelector('.select__inner');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');
const selectOpened = document.querySelector('.select-opened');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}

// Close when click to target

window.addEventListener('click', e => {
  const target = e.target;
  if (!target.closest('.select') && !target.closest('.select__label')) {
    selectSingle.setAttribute('data-state', '');
  }
});

document.addEventListener('scroll', onScroll);

function onScroll(event) {
  const curPos = window.scrollY;
  const sections = document.querySelectorAll('#wrapper>section');
  const links = document.querySelectorAll('#menu a');

  sections.forEach((el) => {

    if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
      links.forEach((a) => {
        a.classList.remove('active-link');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active-link');
        }
      });
    }
  });
}

// anchor links

const anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';
    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}


//Записываем, сколько проскроллено по вертикали
let scrollpos = window.scrollY;

const header = document.querySelector("header");

//Сколько пикселей нужно проскролить, чтобы добавить класс. Можете изменить значение
const scrollChange = 1;

//Функция, которая будет добавлять класс
const add_class_on_scroll = () => header.classList.add("header--height");
const remove_class_on_scroll = () => header.classList.remove("header--height");

//Отслеживаем событие "скролл"
window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  //Если прокрутили больше, чем мы указали в переменной scrollChange, то выполняется функция добавления класса
  if (scrollpos >= scrollChange) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

//start filter product 

window.onload = function () {
  // Tags 
  addTagsClickHandler();
};

const addTagsClickHandler = () => {
  document.querySelector('.service__buttons').addEventListener('click', (e) => {
    if (e.target.classList.contains('service__btn')) {
      let clickedTag = e.target;
      removeSelectedTags();
      selectClickedTag(clickedTag);
      if (clickedTag.innerText === 'Gardens') {
        showAllStrategies();
      } else {
        filterStrategyBySelectedTag(clickedTag.innerText);
      }
    }
  });
};

const removeSelectedTags = () => {
  let tags = document.querySelectorAll('.service__buttons .service__btn');
  tags.forEach(service__btn => {
    service__btn.classList.remove('service__btn--selected');
    service__btn.classList.add('service__btn--bordered');
  });
};

const selectClickedTag = (clickedTag) => {
  clickedTag.classList.add('service__btn--selected');
  clickedTag.classList.remove('service__btn--bordered');
};

const showAllStrategies = () => {
  let strategies = document.querySelectorAll('.service__gallery .product');
  strategies.forEach(product => {
    product.classList.remove('product--hidden');
  });
};

const filterStrategyBySelectedTag = (selectedTag) => {
  let strategies = document.querySelectorAll('.service__gallery .product');
  strategies.forEach(product => {
    product.classList.add('product--hidden');
    product.querySelectorAll('.tag').forEach(tag => {
      if (tag.innerText === selectedTag) {
        product.classList.remove('product--hidden');
      }
    });
  });
};

//end filter product

// start accordion 

let accordion = document.querySelector('.accordion');
let items = accordion.querySelectorAll('.accordion__item');
let title = accordion.querySelectorAll('.accordion__trigger');

function toggleAccordion() {
  let thisItem = this.parentNode;
  
  items.forEach(item => {
    if (thisItem == item ) {
      // if this item is equal to the clicked item, open it.
      thisItem.classList.toggle('active');
      return;
    } 
    // otherwise, remove the open class
    item.classList.remove('active');
  });
}

title.forEach(question => question.addEventListener('click', toggleAccordion));

// end accordion

var HIDDEN_CLASS_NAME = 'hidden';
var TARGET_CLASS_NAME = 'target';
var SOURCE_CLASS_NAME = 'source';

var targetIdToShow = 0;

function main() {
	var targets = getElements(TARGET_CLASS_NAME);
	var sources = getElements(SOURCE_CLASS_NAME);
	sources.forEach(function (sourceNode) {
		var sourceNodeId = extractId(sourceNode, SOURCE_CLASS_NAME);
		sourceNode.addEventListener('click', function () {
			showTarget(targets, sourceNodeId);
		});
	});
	showTarget(targets, targetIdToShow);
}

function getElements(type) {
	return [].slice.call(document.querySelectorAll('.' + type)).sort(function (targetNode1, targetNode2) {
		var target1Num = extractId(targetNode1, TARGET_CLASS_NAME);
		var target2Num = extractId(targetNode2, TARGET_CLASS_NAME);
		return target1Num > target2Num;
	});
}

function extractId(targetNode, baseClass) {
	var currentClassIndex = targetNode.classList.length;
	while (currentClassIndex--) {
		var currentClass = targetNode.classList.item(currentClassIndex);
		var maybeIdNum = parseInt(currentClass.split('-')[1]);
		if (isNaN(maybeIdNum)) {
			continue;
		}
		var classStrinToValidate = baseClass + '-' + maybeIdNum;
		if (classStrinToValidate === currentClass) {
			return maybeIdNum;
		}
	}
}

function showTarget(targets, targetId) {
	targets.forEach(function (targetNode, targetIndex) {
    var currentTargetNodeId = extractId(targetNode, TARGET_CLASS_NAME);
		if (currentTargetNodeId === targetId) {
			targetNode.classList.remove(HIDDEN_CLASS_NAME);
		} else {
			targetNode.classList.add(HIDDEN_CLASS_NAME);
		}
	});
}

main();

    // console.log('1.Вёрстка валидная +10\n', '2.Вёрстка семантическая +20\n', '3.Вёрстка соответствует макету +48\n',
    //   '4.Требования к css + 12\n', '5.Интерактивность, реализуемая через css +20\n');