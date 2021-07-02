import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { MongoUsersRepository } from './../../repositories/implementations/MongoUsersRepository';
import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";

const mailTrapMailProvider = new MailTrapMailProvider();
const mongoUsersRepository = new MongoUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    mongoUsersRepository,
    mailTrapMailProvider,
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
