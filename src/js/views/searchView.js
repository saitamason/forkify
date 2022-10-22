class SearchView {
  #parentElement = document.querySelector('.search');
  #inputField = this.#parentElement.querySelector('.search__field');

  getQuery() {
    const query = this.#inputField.value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this.#inputField.value = '';
  }
}

export default new SearchView();
