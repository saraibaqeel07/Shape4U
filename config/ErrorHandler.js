export const ErrorHandler = (error) => {
    if (error?.response) {
        const message =
            error.response.data?.message ||
            error.response.data?.error ||
            "Something went wrong";
        return new Error(message);
    }
    if (error?.request) {
        return new Error("No response from server. Check your network.");
    }
    return new Error(error?.message || "Unexpected error");
};
