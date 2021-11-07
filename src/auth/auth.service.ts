import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository:  UsersRepository,
    ){}
    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto)
    }
}
