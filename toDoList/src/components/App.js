// import listElement from './listElement';

class App {
  _elementList;
  _complitedList;
  _textList;
  _root;

  constructor() {
    this._root = document.createElement('div');
    this._root.id = 'app';
  }

  init() {
    document.body.append(this.buildApp());
  }

  buildApp() {
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerText = 'TO DO LIST';

    const settings = document.createElement('div');
    settings.classList.add('settings');

    settings.append(
      createButton('Even', setEven),
      createButton('Odd', setOdd),
      createButton('Delete last', deleteLast),
      createButton('Delete first', deleteFirst)
    );

    this._elementList = document.createElement('ul');
    this._elementList.classList.add('element-list');

    this._complitedList = document.createElement('ul');
    this._complitedList.classList.add('element-list', 'complited-list');

    this._root.append(header, settings, this._elementList, this._complitedList);

    function setEven() {}
    function setOdd() {}
    function deleteLast() {}
    function deleteFirst() {}

    function createButton(name, event) {
      const button = document.createElement('button');
      button.innerText = name;
      button.addEventListener('click', event);

      return button;
    }

    return this._root;
  }

  createSettings() {}
}
export default App;
