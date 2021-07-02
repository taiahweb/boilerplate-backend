import { User } from './../../entities/User';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists!');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Taiah Web',
                email: 'contato@taiahweb.dev.br'
            },
            subject: 'Seja bem vindo à plataforma',
            body: '<p>Você já pode fazer login na nossa plataforma<p/>'
        });
    }
}
