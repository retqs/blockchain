import Block from './block.util';
import { cryptoHash } from './cryptoHash.util';

class Blockchain {
	chain: Block[];

	constructor() {
		this.chain = [Block.createGenesis()];
	}

	addBlock({ data }) {
		const newBlock = Block.mineBlock({
			lastBlock: this.chain[this.chain.length - 1],
			data,
		});
		this.chain.push(newBlock);
	}

	replaceHash(chain: Block[]) {
		if (this.chain.length !== chain.length) return;

		if (!Blockchain.isValidChain(chain)) return;

		return (this.chain = chain);
	}

	static isValidChain(chain: Block[]): boolean {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.createGenesis()))
			return false;

		for (let i = 1; i < chain.length; i++) {
			const { data, timestamp, prevHash, hash, nonce, difficulty } = chain[i];
			const currentLashHash = chain[i - 1].hash;
			const lastDifficulty = chain[i - 1].difficulty;

			if (prevHash !== currentLashHash) return false;

			const validatedHash = cryptoHash(
				timestamp,
				prevHash,
				data,
				nonce,
				difficulty
			);

			if (hash !== validatedHash) return false;

			if (Math.abs(lastDifficulty - difficulty) > 1) return false;
		}

		return true;
	}
}

export default Blockchain;
