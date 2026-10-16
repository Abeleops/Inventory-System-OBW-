class InventoryApiClient {
  constructor(config) {
    this.baseUrl = (config.apiBaseUrl || '').replace(/\/$/, '');
    this.token = sessionStorage.getItem('inventory_api_token') || '';
  }

  get enabled() { return Boolean(this.baseUrl); }

  async request(path, options = {}) {
    if (!this.enabled) return null;
    const headers = { Accept: 'application/json', ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    const response = await fetch(`${this.baseUrl}${path}`, { ...options, headers });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return response.status === 204 ? null : response.json();
  }

  async inventory(params = '') { return this.request(`/inventory${params}`); }
  async employees() { return this.request('/employees'); }
  async uploadInventory(file) { const form = new FormData(); form.append('file', file); return this.request('/inventory/import', { method: 'POST', body: form }); }
  async exportInventory() { return this.request('/inventory/export'); }
}

window.InventoryApiClient = InventoryApiClient;
