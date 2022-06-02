//OPEN MENU BY BUTTON
document
  .querySelector('.mob-menu__open-btn')
  .addEventListener('click', function () {
    document.querySelector('.mob-menu').classList.toggle('active');
  });
//CLOSE MENU BY BUTTON
document
  .querySelector('.mob-menu__close-btn')
  .addEventListener('click', function () {
    document.querySelector('.mob-menu').classList.toggle('active');
  });
//CLOSE MENU BY CLICK ON LINK
const menu__link = document.querySelectorAll('.mob-menu__link');

function classToogle() {
  document.querySelector('.mob-menu').classList.toggle('active');
}
menu__link.forEach(item => {
  item.addEventListener('click', classToogle);
});
