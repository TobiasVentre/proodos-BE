export class ComponenteService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient.get("/componentes");
  }
}
