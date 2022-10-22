import View from './View.js';

class AddRecipeView extends View {
  _message = 'Recipe successfully uploaded.';
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = Object.fromEntries([...new FormData(this)]);
      handler(formData);
    });
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._buttonClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {
    return `
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input
        value=""
        required
        name="title"
        type="text"
        placeholder="Classic Italian Pizza"
      />
      <label>URL</label>
      <input
        value=""
        required
        name="sourceUrl"
        type="url"
        placeholder="https://italianpizza.com/"
      />
      <label>Image URL</label>
      <input
        value=""
        required
        name="image"
        type="url"
        placeholder="https://italianpizza.com/photo.png"
      />
      <label>Publisher</label>
      <input
        value=""
        required
        name="publisher"
        type="text"
        placeholder="Kitchen Chef Luigi"
      />
      <label>Prep time</label>
      <input
        value=""
        required
        name="cookingTime"
        type="number"
        placeholder="60"
      />
      <label>Servings</label>
      <input
        value=""
        required
        name="servings"
        type="number"
        placeholder="4"
      />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        value=""
        type="text"
        required
        name="ingredient-1"
        placeholder="1, kg, Wheat Flour"
      />
      <label>Ingredient 2</label>
      <input
        value=""
        type="text"
        name="ingredient-2"
        placeholder="200, g, Cheese"
      />
      <label>Ingredient 3</label>
      <input
        value=""
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="src/img/icons.svg#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
    `;
  }
}

export default new AddRecipeView();
