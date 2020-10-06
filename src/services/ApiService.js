import FormatData from './FormatData';

export default class ApiService {
  _apiKey = '?api_key=3b74691a96811eecae740c01bb3dfeb1';

  _apiBase = 'https://api.themoviedb.org/3';

  formatData = new FormatData();

  static genres = {};

  async getRequest(url, obj = null) {
    const res = await fetch(`${this._apiBase}${url}`, obj);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status} `);
    }
    const response = await res.json();
    return response;
  }

  getGenres = async () => {
    this.genres = await this.getRequest(`/genre/movie/list${this._apiKey}&language=ru`)
      .then(({ genres }) => this.formatData.arrayToObject(genres));
    return this.genres;
  };

  getRated = async (page) => {
    const session = JSON.parse(sessionStorage.getItem('session'));
    if (!session) {
      return {
        movies: [],
        currentPage: 1,
        totalPages: 1,
      };
    }

    const res = await this.getRequest(`/guest_session/${session.token}/rated/movies${this._apiKey}&page=${page}&language=ru&sort_by=created_at.asc`);
    const ratedMovies = await this.formatData.formatMovieData(res.results, this.genres);

    return {
      movies: ratedMovies,
      currentPage: res.page,
      totalResults: res.total_results,
    };
  };

  searchMovies = async (query, page) => {
    const ratedMovies = await (await this.getRated(1)).movies;
    const res = await this.getRequest(`/search/movie${this._apiKey}&language=ru&query=${query}&page=${page}&include_adult=false`);
    const searchedMovies = await this.formatData.formatMovieData(res.results, this.genres)
      .then((result) => this.formatData.mergeData(result, ratedMovies));

    return {
      movies: searchedMovies,
      currentPage: res.page,
      totalResults: res.total_results,
    };
  };

  initguestSession = async () => {
    const res = await this.getRequest(`/authentication/guest_session/new${this._apiKey}`);
    const session = {
      token: res.guest_session_id,
      expiry: res.expires_at,
    };

    sessionStorage.setItem('session', JSON.stringify(session));
  };

  setRating = async (id, session, data) => {
    const res = await this.getRequest(`/movie/${id}/rating${this._apiKey}&guest_session_id=${session}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  };
}