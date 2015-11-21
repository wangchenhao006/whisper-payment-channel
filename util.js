var channelContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"claim","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"getHash","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"}],"name":"Deposit","type":"event"}]);
var channel = channelContract.at("0x14b1d67c2dabdc5f13716e88571766b2d86e00e9");

function sign(account, recipient, amount) {
	var sig = eth.sign(account, channel.getHash(recipient, amount));
	sig = sig.substr(2, sig.length);

	var res = {};
	res.r = "0x" + sig.substr(0, 64);
	res.s = "0x" + sig.substr(64, 64);
	res.v = web3.toHex( web3.toDecimal(sig.substr(128, 2)) + 27 );

	return res
}
