import listElement from './listElement';
import removeClasses from '../utils/removeClasses';

class App {
  _uncompletedList;
  _completedList;
  _root;
  _elementCount;
  _elementList;

  constructor() {
    this._root = document.createElement('div');
    this._root.id = 'app';
    this._elementList = [];

    this._elementCount = Math.max(...Object.keys(localStorage)) < 0 ? 0 : Math.max(...Object.keys(localStorage));
  }

  init() {
    document.body.append(this.buildApp());
  }

  buildApp() {
    const addItem = () => {
      removeClasses();

      const text = this.input.value;
      if (text === '') return;

      this.input.value = '';
      this._elementCount++;

      const element = new listElement(text, this._elementCount);
      this._uncompletedList.append(element.getElement());
      localStorage.setItem(this._elementCount, JSON.stringify([text, 1]));
    };
    const setEven = () => {
      this._elementList = document.querySelectorAll('.list-element');
      for (let i = 0; i < this._elementList.length; i++) {
        if (i % 2 !== 0) {
          this._elementList[i].classList.toggle('even');
        }
      }
    };
    const setOdd = () => {
      this._elementList = document.querySelectorAll('.list-element');
      for (let i = 0; i < this._elementList.length; i++) {
        if (i % 2 === 0) {
          this._elementList[i].classList.toggle('odd');
        }
      }
    };
    const deleteFirst = () => {
      removeClasses();

      const element = document.querySelectorAll('.list-element');
      if (element.length === 0) return;
      element[0].remove();
      localStorage.removeItem(element[0].dataset.id);
    };
    const deleteLast = () => {
      removeClasses();

      const element = document.querySelectorAll('.list-element');
      if (element.length === 0) return;
      element[element.length - 1].remove();
      localStorage.removeItem(element[element.length - 1].dataset.id);
    };

    const header = document.createElement('div');
    header.classList.add('header');
    header.innerText = 'TO DO LIST';

    const inputBlock = document.createElement('div');
    inputBlock.classList.add('input-block');
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        addItem();
      }
    });

    inputBlock.append(this.input, createButton('Add', addItem));

    const settings = document.createElement('div');
    settings.classList.add('settings');

    settings.append(
      createButton('Even', setEven),
      createButton('Odd', setOdd),
      createButton('Delete first', deleteFirst),
      createButton('Delete last', deleteLast)
    );

    this._uncompletedList = document.createElement('ul');
    this._uncompletedList.classList.add('element-list');

    this._completedList = document.createElement('ul');
    this._completedList.classList.add('element-list', 'completed-list');

    const keys = Object.keys(localStorage).sort((a, b) => a - b);
    for (let key of keys) {
      const text = JSON.parse(localStorage.getItem(key))[0];
      const index = JSON.parse(localStorage.getItem(key))[1];
      const element = new listElement(text, key).getElement();

      if (index === 1) {
        this._uncompletedList.append(element);
      } else {
        element.classList.add('completed');
        this._completedList.append(element);
      }
    }

    this._root.append(header, inputBlock, settings, this._uncompletedList, this._completedList);

    function createButton(name, event) {
      const button = document.createElement('button');
      button.innerText = name;
      button.addEventListener('click', event);

      return button;
    }

    return this._root;
  }
}
export default App;
