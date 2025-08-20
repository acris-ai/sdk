/**
 * Response format for one-off run operations
 */
export interface RunResponse {
    result: string | Record<string, any>;
}

/**
 * Configuration options for the Acris AI client
 */
export interface AcrisAIOptions {
    /** Base URL for the API (defaults to https://www.acris.ai) */
    baseUrl?: string;
}

/**
 * Base error class for Acris AI SDK
 */
export class AcrisError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly details?: Record<string, any>
    ) {
        super(message);
        this.name = 'AcrisError';
    }
}

/**
 * Validation error class for invalid inputs
 */
export class ValidationError extends AcrisError {
    constructor(message: string, details?: Record<string, any>) {
        super(message, 400, details);
        this.name = 'AcrisValidationError';
    }
}

/**
 * Authentication error class
 */
export class AuthenticationError extends AcrisError {
    constructor(message: string = 'Invalid API key') {
        super(message, 401);
        this.name = 'AcrisAuthenticationError';
    }
}
