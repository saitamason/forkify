import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data = 1, render = true) {
    if (this._isEmptyOrUndefined(data)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearContainerAndInsert(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      if (this._contentsDiffer(currentElement, newElement))
        currentElement.textContent = newElement.textContent;

      if (this._nodesDiffer(currentElement, newElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearContainerAndInsert(markup);
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
    `;
    this._clearContainerAndInsert(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clearContainerAndInsert(markup);
  }

  _clearContainerAndInsert(markup) {
    this._clear();
    this._insert(markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insert(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _isEmptyOrUndefined(data) {
    return !data || (Array.isArray(data) && data.length === 0);
  }
  _contentsDiffer(currentElement, newElement) {
    return (
      !newElement.isEqualNode(currentElement) &&
      newElement.firstChild?.nodeValue.trim() !== ''
    );
  }
  _nodesDiffer(currentNode, newNode) {
    return !newNode.isEqualNode(currentNode);
  }
}
