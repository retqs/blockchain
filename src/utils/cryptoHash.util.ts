import crypto from 'crypto';

export const cryptoHash = (...props: any): string => {
	const hash = crypto.createHash('sha256');
	hash.update(props.sort().join(' '));
	return hash.digest('hex');
};
