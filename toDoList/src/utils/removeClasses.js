const removeClasses = () => {
  const elementList = document.querySelectorAll('.list-element');
  for (let i = 0; i < elementList.length; i++) {
    elementList[i].classList.remove('odd');
    elementList[i].classList.remove('even');
  }
};

export default removeClasses;
