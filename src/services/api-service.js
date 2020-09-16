export default class ApiService {
  _apiKey = 'api_key=3b74691a96811eecae740c01bb3dfeb1';

  _apiBase = 'https://api.themoviedb.org/3';

  async requestGenresList() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?${this._apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getGenresList() {
    const genresList = this.requestGenresList();
    return genresList;
  }

  async requestSearchList(searchTerm, pageNumber) {
    const res = await fetch(`${this._apiBase}/search/movie?${this._apiKey}&query=${searchTerm}&page=${pageNumber}`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getSearchList(searchTerm, pageNumber) {
    const filmList = this.requestSearchList(searchTerm, pageNumber);
    return filmList;
  }

  async requestGuestSession() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new?${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getGuestId() {
    const guest = this.requestGuestSession();
    return guest;
  }

  async requestRateMovie(movieId, guestId, requestBody) {
    const response = await fetch(`${this._apiBase}/movie/${movieId}/rating?guest_session_id=${guestId}&${this._apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`Could not fetch url, received ${response.status}`);
    }
    const result = await response.json();
    return result;
  }

  async requestRatedMovieList(guestId) {
    const res = await fetch(`${this._apiBase}/guest_session/${guestId}/rated/movies?${this._apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getRatedList(guestId) {
    const Rated = this.requestRatedMovieList(guestId);
    return Rated;
  }
}