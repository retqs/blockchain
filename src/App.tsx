import Block from 'utils/block.util';
import Blockchain from 'utils/blockchain.util';

const minedBlock = Block.createGenesis();

const blockchain = new Blockchain();

console.log(blockchain.chain, 'before');
blockchain.addBlock({ data: 'OhDear' });
console.log(blockchain.chain, 'after');

const isValid = Blockchain.isValidChain(blockchain.chain);
console.log(isValid, 'yes im pretty valid');

function App() {
	return (
		<div className='App'>
			<h2>if I could find way</h2>
		</div>
	);
}

export default App;
