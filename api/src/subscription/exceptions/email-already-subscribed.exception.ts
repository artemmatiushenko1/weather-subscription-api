import { HttpException, HttpStatus } from '@nestjs/common';

class EmailAlreadySubscribedException extends HttpException {
  constructor() {
    super('Email already subscribed', HttpStatus.CONFLICT);
  }
}

export { EmailAlreadySubscribedException };
