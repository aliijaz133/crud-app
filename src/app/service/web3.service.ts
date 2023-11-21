import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: Web3;

  private token = "5c5f653e31b94e6092470d3ac36956b7";

  constructor() {

    if (typeof window.ethereum !== 'undefined') {

      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else {

      this.web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${this.token}`));
    }
  }

  logThings(): any {
    console.log(this.web3);
    return this.web3;
  }

}
