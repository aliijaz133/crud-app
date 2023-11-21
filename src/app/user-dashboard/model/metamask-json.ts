export interface MetamaskJson {
    method: string,
    params: {
        type: string,
        options: {
            address: string,
            method: string,
            decimals: number,
            images: string
        }
    }
}
