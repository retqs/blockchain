import hexToBinary from 'hex-to-binary';

import { GENESIS_DATA, MINE_RATE } from 'const/config';

import { cryptoHash } from './cryptoHash.util';

interface BlockProps<T> {
	timestamp: number;
	data: T;
	hash: string;
	prevHash: string;
	nonce?: number;
	difficulty?: number;
}

class Block {
	hash: string;
	data: any;
	prevHash: string;
	timestamp: number;
	nonce: number;
	difficulty: number;

	constructor({
		data,
		hash,
		prevHash,
		timestamp,
		nonce,
		difficulty,
	}: BlockProps<typeof data>) {
		this.timestamp = timestamp;
		this.hash = hash;
		this.data = data;
		this.prevHash = prevHash;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	static createGenesis() {
		return new this(GENESIS_DATA);
	}

	static mineBlock<T>({
		lastBlock,
		data,
	}: {
		lastBlock: BlockProps<T>;
		data: any;
	}) {
		let hash: string, timestamp: number;
		// const timestamp = Date.now();
		const prevHash = lastBlock.hash;
		let { difficulty } = lastBlock;
		// PROOF OF WORK CONCEPT
		// should be changeable through process of mining
		let nonce = 0;

		do {
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
			hash = cryptoHash(timestamp, prevHash, data, difficulty, nonce);
		} while (
			hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
		);

		return new this({
			timestamp,
			prevHash,
			data,
			hash,
			difficulty,
			nonce,
		});
	}

	static adjustDifficulty({ originalBlock, timestamp }) {
		const { difficulty } = originalBlock;

		const difference = timestamp - originalBlock.timestamp;

		if (difficulty < 1) return 1;

		if (difference > MINE_RATE) return difficulty - 1;

		return difficulty + 1;
	}
}

export default Block;
