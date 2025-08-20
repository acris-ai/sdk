import {
    AcrisAIOptions,
    AcrisError,
    AuthenticationError,
    RunResponse,
    ValidationError
} from './types';

export class AcrisAI {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    /**
     * Creates a new Acris AI client instance
     * @param apiKey Your Acris AI API key
     * @param options Configuration options
     */
    constructor(apiKey: string, options: AcrisAIOptions = {}) {
        if (!apiKey) {
            throw new ValidationError('API key is required');
        }

        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || 'https://app.acris.ai';
    }

    async run(agentId: string, body: Record<string, unknown>): Promise<RunResponse> {
        return this.httpCall<RunResponse>(
            `agents/${agentId}/run`,
            'POST',
            body
        );
    }

    async httpCall<T>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        body?: unknown
    ): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}/api/public/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                const error = await response.json() as { error: string };

                if (response.status === 401) {
                    throw new AuthenticationError(error.error);
                }
                throw new AcrisError(error.error || 'Request failed', response.status);
            }

            return await response.json() as T;
        } catch (error) {
            if (error instanceof AcrisError) {
                throw error;
            }
            throw new AcrisError('Network error', 0);
        }
    }
}