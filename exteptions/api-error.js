
// Modules

module.exports = class ApiError extends Error {
    status;
    error;

    constructor(status, error, message) {
        super(message);
        this.status = status;
        this.error = error;
    }

    static AuthError() {
        return new ApiError(401, 'User not register');
    }

    static BadRequest() {
        return new ApiError(400, 'Error')
    }
}