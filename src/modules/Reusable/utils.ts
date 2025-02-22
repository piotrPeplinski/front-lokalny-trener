const getErrorMessage = (
  error: any,
  defaultMessage: string = "Wystąpił błąd."
) => {
  if (error?.response) {
    return (
      error.response.data?.detail ||
      error.response.data?.message ||
      error.response.data?.error ||
      error.response.data?.new_password ||
      (Array.isArray(error.response.data) && error.response.data[0]) || // First error in array
      defaultMessage // Fallback message
    );
  }
  return defaultMessage;
};

export { getErrorMessage };
