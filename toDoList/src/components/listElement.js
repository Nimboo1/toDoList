import removeClasses from '../utils/removeClasses';

class listElement {
  constructor(text, id) {
    this._element = document.createElement('div');
    this._element.classList.add('list-element');
    this._element.dataset.id = id;
    this.id = id;
    this._text = text;

    const p = document.createElement('p');
    p.innerText = text;

    const setComplete = () => {
      removeClasses();

      this._element.classList.add('complited');
      const complitedList = document.querySelector('.complited-list');
      complitedList.append(this._element);
      localStorage.setItem(this.id, JSON.stringify([text, 2]));
    };
    const setDeleted = () => {
      removeClasses();

      this._element.remove();
      localStorage.removeItem(this.id);
    };

    const compliteButton = this.createButton('complete', setComplete);
    compliteButton.classList.add('complete-btn');
    const deleteButton = this.createButton('delete', setDeleted);

    this._element.append(compliteButton, p, deleteButton);
  }

  getElement() {
    return this._element;
  }

  createButton(name, event) {
    const button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', event);

    return button;
  }
}
export default listElement;
