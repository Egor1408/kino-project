export default class ApiService {
  _apiKey = 'api_key=3b74691a96811eecae740c01bb3dfeb1';

  _apiBase = 'https://api.themoviedb.org/3';

  async getGenresList() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?${this._apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getGenre() {
    const genresList = this.getGenresList();
    return genresList;
  }

  async getSearch(term) {
    const res = await fetch(`${this._apiBase}/search/movie?${this._apiKey}&query=${term}`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getList(searchTerm) {
    const filmList = this.getSearch(searchTerm);
    return filmList;
  }
}
