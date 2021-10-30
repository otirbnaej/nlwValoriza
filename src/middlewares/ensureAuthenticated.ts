import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
	sub: string;
}

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	// Receber token
	const authToken = request.headers.authorization;

	// Validar se o token está preenchido
	if (!authToken) {
		return response.status(401).end();
	}

	const [, token] = authToken.split(' ');
	// Verificar se o token é válido
	try {
		const { sub } = verify(
			token,
			'635634f0c1f8faaf4184a69b6a4d6153',
		) as IPayload;

		// Recuper informações do usuário
		request.user_id = sub;

		return next();
	} catch (err) {
		return response.status(401).end();
	}
}
