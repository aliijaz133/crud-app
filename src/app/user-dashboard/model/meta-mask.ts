export interface MetaMask {
    method: "wallet_watchAsset",
    params: {
        type: "ERC20",
        options: {
            address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            symbols: "FOO",
            decimals: 18,
            image: "https://foo.io/token-image.svg"
        }
    }
}
