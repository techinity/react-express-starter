export default class UiState {
  windowHeight = 0;

  windowWidth = 0;

  constructor({
    windowHeight = 0,
    windowWidth = 0,
  } = {}) {
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;
  }
}
