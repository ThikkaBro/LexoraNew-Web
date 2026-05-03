/**
 * ============================================================
 *  LEXORA TECH — API Service Layer
 * ============================================================
 *  Secure bridge between the React SPA and the existing
 *  PHP backend. All backend communication is centralized here.
 * ============================================================
 */

import axios from 'axios';
import DOMPurify from 'dompurify';
import debounce from 'lodash.debounce';

// ─── Configuration ───────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    '[Lexora API] VITE_API_BASE_URL is not defined. ' +
    'Please create a .env file from .env.example'
  );
}

// ─── Axios Instance ──────────────────────────────────────────

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
  headers: {
    'Accept': 'text/html,application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// ─── Request Interceptor ─────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    if (import.meta.env.VITE_APP_ENV === 'development') {
      console.log(`[Lexora API] ${config.method?.toUpperCase()} → ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => {
    if (response.status >= 300 && response.status < 400) {
      return {
        ...response,
        data: { success: true, redirectUrl: response.headers?.location || null },
      };
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: 'Unable to connect to the server. Please check your connection.',
        isNetworkError: true,
      });
    }
    const { status } = error.response;
    const errorMap = {
      403: 'Access denied. Please refresh and try again.',
      404: 'The requested endpoint was not found.',
      429: 'Too many requests. Please wait a moment.',
      500: 'Server error. Please try again later.',
    };
    return Promise.reject({
      message: errorMap[status] || `Unexpected error (${status})`,
      status,
      data: error.response.data,
    });
  }
);

// ─── Sanitization ────────────────────────────────────────────

const sanitize = (value) => {
  if (typeof value !== 'string') return value;
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
};

const sanitizePayload = (payload) => {
  const clean = {};
  for (const [key, value] of Object.entries(payload)) {
    if (Array.isArray(value)) {
      clean[key] = value.map((v) => sanitize(v));
    } else {
      clean[key] = sanitize(value);
    }
  }
  return clean;
};

// ─── Payload Builder ─────────────────────────────────────────

const buildFormPayload = (data) => {
  const sanitized = sanitizePayload(data);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sanitized)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(`${key}[]`, v));
    } else if (value !== '' && value !== null && value !== undefined) {
      params.append(key, value);
    }
  }
  return params;
};

// ─── Endpoint Constants ──────────────────────────────────────

const ENDPOINTS = Object.freeze({
  QUOTE_SUBMIT:   '/process-quote.php',
  CONTACT_SUBMIT: '/send_email.php',
  BLOG_LIST:      '/blog.php',
  PORTFOLIO:      '/portfolio.php',
  SERVICES:       '/services.php',
  ABOUT:          '/about.php',
});

// ─── Service Functions ───────────────────────────────────────

export const submitQuote = async (formData) => {
  const payload = buildFormPayload(formData);
  const response = await apiClient.post(ENDPOINTS.QUOTE_SUBMIT, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return { success: true, data: response.data };
};

export const submitContact = async (formData) => {
  const payload = buildFormPayload(formData);
  const response = await apiClient.post(ENDPOINTS.CONTACT_SUBMIT, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return { success: true, data: response.data };
};

export const subscribeNewsletter = async (email) => {
  const payload = buildFormPayload({
    name: 'Newsletter Subscriber',
    email,
    message: '[NEWSLETTER SUBSCRIPTION REQUEST]',
  });
  const response = await apiClient.post(ENDPOINTS.CONTACT_SUBMIT, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return { success: true, data: response.data };
};

// ─── Debounced Versions ──────────────────────────────────────

const createDebouncedSubmit = (submitFn, delayMs = 2000) => {
  let pendingResolve = null;
  let pendingReject = null;
  const debouncedFn = debounce(async (formData) => {
    try {
      const result = await submitFn(formData);
      if (pendingResolve) pendingResolve(result);
    } catch (error) {
      if (pendingReject) pendingReject(error);
    }
  }, delayMs, { leading: true, trailing: false });

  return (formData) => {
    return new Promise((resolve, reject) => {
      pendingResolve = resolve;
      pendingReject = reject;
      debouncedFn(formData);
    });
  };
};

export const submitQuoteDebounced = createDebouncedSubmit(submitQuote);
export const submitContactDebounced = createDebouncedSubmit(submitContact);
export const subscribeNewsletterDebounced = createDebouncedSubmit(subscribeNewsletter);

export { apiClient, ENDPOINTS, sanitize, sanitizePayload };

export default {
  submitQuote, submitContact, subscribeNewsletter,
  submitQuoteDebounced, submitContactDebounced, subscribeNewsletterDebounced,
  ENDPOINTS,
};
