let currentArray;
const arrayMap = [0, 0, 0, 0, 0, 0];
let clickCount = 0;
let xorValue = 0;
const container = document.querySelector('.container');
const reset = document.querySelector('#reset');
const btn = document.querySelector('#btn');
let images;
const success = document.querySelector('.success');
const fail = document.querySelector('.fail');
function generateArray() {
  let tempImageArray = new Set();
  while (tempImageArray.size !== 5) {
    const random = Math.trunc(Math.random() * 5) + 1;
    tempImageArray.add(random);
  }
  return [...tempImageArray, Math.trunc(Math.random() * 5) + 1];
}
function displayImages() {
  if (!currentArray) {
    currentArray = generateArray();
  }
  let html = currentArray.reduce(
    (acc, img, i) =>
      acc +
      `<div class="images"><img data-ns-test="img${img}" src="./img${img}.jpg" alt="" srcset="" onClick="clickHandler(${i})"/></div>\n`,
    ''
  );
  container.innerHTML = html;
  images = document.querySelectorAll('.images');
  console.log(images);
}

function verifyHandler() {
  if (xorValue === 0) {
    success.classList.add('active');
  } else {
    fail.classList.add('active');
  }
}

function resetHandler() {
  clickCount = 0;
  xorValue = 0;
  for (let i = 0; i < arrayMap.length; i++) {
    arrayMap[i] = 0;
    images[i].classList.remove('selected');
  }
  success.classList.remove('active');
  fail.classList.remove('active');
  displayUI();
}
function displayUI() {
  if (clickCount > 0) {
    reset.classList.add('active');
  } else {
    reset.classList.remove('active');
  }
  if (clickCount <= 1) {
    btn.classList.remove('active');
  } else {
    btn.classList.add('active');
  }
}
function clickHandler(i) {
  if (arrayMap[i] == 0) {
    xorValue ^= currentArray[i];
    arrayMap[i] = 1;
    clickCount++;
    images[i].classList.add('selected');
  }
  displayUI();
}
