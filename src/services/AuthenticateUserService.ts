import { getCustomRepository } from 'typeorm';

import { compare } from 'bcryptjs';

import { UsersRepositories } from '../repositories/UsersRepositories';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
	email: string;
	password: string;
}

class AuthenticateUserService {
	async execute({ email, password }: IAuthenticateRequest) {
		const usersRepositories = getCustomRepository(UsersRepositories);

		const user = await usersRepositories.findOne({
			email,
		});

		if (!user) {
			throw new Error('Email/Password incorrect');
		}

		// Verifying if pwd matches

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error('Email/Password incorrect');
		}

		// Generate Token
		const token = sign(
			{
				email: user.email,
			},
			'635634f0c1f8faaf4184a69b6a4d6153',
			{
				subject: user.id,
				expiresIn: '1d',
			},
		);

		return token;
	}
}

export { AuthenticateUserService };
