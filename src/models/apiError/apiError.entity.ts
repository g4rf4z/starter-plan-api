export const ERROR_TYPE = ['API', 'DATABASE', 'VALIDATION'] as const;

export type ErrorType = (typeof ERROR_TYPE)[number];

export type IApiError = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: number;
  type: ErrorType;
  message: string;
  path: string;
  userId?: string | null;
  userIp?: string | null;
  details?: string | null;
  raw?: string | null;
};

export type IApiErrorRead = Required<IApiError>;
export type IApiErrorCustom = Omit<IApiError, 'status' | 'message'>;

export class ApiError {
  id;
  createdAt;
  updatedAt;
  userId;
  userIp;
  type;
  path;
  status;
  message;
  details;
  raw;

  constructor(data: IApiError) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
    this.userIp = data.userIp;
    this.type = data.type;
    this.path = data.path;
    this.status = data.status;
    this.message = data.message;
    this.details = data.details;
    this.raw = data.raw;
  }
}

export class ValidationError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 400,
      message: 'validation_error',
    });
  }
}

export class CredentialsError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 401,
      message: 'invalid_credentials',
    });
  }
}

export class AuthorizationError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 403,
      message: 'unauthorized',
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 404,
      message: 'not_found',
    });
  }
}

export class ConflictError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 409,
      message: 'conflict',
    });
  }
}

export class ServerError extends ApiError {
  constructor(data: IApiErrorCustom) {
    super({
      ...data,
      status: 500,
      message: 'internal_server_error',
    });
  }
}
