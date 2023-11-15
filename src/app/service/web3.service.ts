import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor() {
    const apiKey = "5c5f653e31b94e6092470d3ac36956b7"
  }

  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/5c5f653e31b94e6092470d3ac36956b7'));

  logThings(): any {
    console.log(this.web3);
    return this.web3;
  }
}
