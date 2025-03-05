const API_BASE_URL = process.env.NEXTAUTH_URL || "https://uilibraryservice.com.ng";

export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};
