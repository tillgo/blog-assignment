export class ThrowableProblem extends Error {
    constructor(
        message: string,
        public status: number = 500
    ) {
        super(message)
        this.name = this.constructor.name
    }
}

export class BadRequestProblem extends ThrowableProblem {
    constructor(message: string) {
        super(message, 400)
    }
}

export class UnauthorizedProblem extends ThrowableProblem {
    constructor(
        message: string = 'Unauthorized access: You need to be logged in to access this resource'
    ) {
        super(message, 401)
    }
}

export class ForbiddenProblem extends ThrowableProblem {
    constructor(
        message: string = 'Forbidden access: You do not have the necessary permissions to access this resource'
    ) {
        super(message, 401)
    }
}
