type ErrorWithMessage = {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        return new Error(String(maybeError))
    }
}

export function getErrorMessage(error: unknown) {
    const errorWithMessage = toErrorWithMessage(error)
    const message = errorWithMessage.message
    const stack = (errorWithMessage instanceof Error) ? errorWithMessage.stack : undefined
    return stack ? `${message}\n${stack}` : message
}