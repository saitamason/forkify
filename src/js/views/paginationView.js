import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      if (!button) return;

      const { goto } = button.dataset;
      handler(+goto);
    });
  }

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._firstPageAndAreMore(numberOfPages))
      return this._generateNextButtonMarkup();

    if (this._lastPage(numberOfPages))
      return this._generatePreviousButtonMarkup();

    if (this._notFirstNorLastPage(numberOfPages))
      return `${this._generatePreviousButtonMarkup()}${this._generateNextButtonMarkup()}`;

    if (this._firstAndOnlyPage(numberOfPages)) return '';
  }

  _firstPageAndAreMore(numberOfPages) {
    return this._data.page === 1 && numberOfPages > 1;
  }
  _lastPage(numberOfPages) {
    return this._data.page === numberOfPages && numberOfPages > 1;
  }
  _notFirstNorLastPage(numberOfPages) {
    return this._data.page < numberOfPages && this._data.page > 1;
  }
  _firstAndOnlyPage(numberOfPages) {
    return this._data.page === 1 && numberOfPages === 1;
  }

  _generateNextButtonMarkup() {
    const goTo = this._data.page + 1;
    return `
      <button data-goto="${goTo}" class="btn--inline pagination__btn--next">
        <span>Page ${goTo}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
  _generatePreviousButtonMarkup() {
    const goTo = this._data.page - 1;
    return `
      <button data-goto="${goTo}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${goTo}</span>
      </button>`;
  }
}

export default new PaginationView();
