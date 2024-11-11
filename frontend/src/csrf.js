// csrf.js
export function getCsrfToken() {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
          csrfToken = decodeURIComponent(value);
        }
      });
    }
    return csrfToken;
  }
  