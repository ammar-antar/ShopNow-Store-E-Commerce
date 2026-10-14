export function getErrorMessage(error) {
  if (!error) return "";

  if (error.response) {
    const { status, data } = error.response;
    if (data && typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (status === 400) return "Invalid request. Check your input.";
    if (status === 401) return "Invalid username or password.";
    if (status === 403) return "You don't have permission to do that.";
    if (status === 404) return "Not found.";
    if (status === 429) return "Too many requests. Try again later.";
    if (status >= 500) return "Server is temporarily unavailable.";
    if (status >= 400) return "Something went wrong with the request.";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Check your connection.";
  }

  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Network error. Check your connection.";
  }

  if (error.code === "ERR_CANCELED") {
    return "Request was cancelled.";
  }

  if (typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong.";
}