// home.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Web3Service } from 'src/app/service/web3.service';

declare let ethereum : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showLoader = false;
  userAddress!: string;
  userBalance!: string;
  isConnected = false;

  constructor(private web3service: Web3Service, private toastr: ToastrService) { }

  async ngOnInit() {
    this.showLoader = true;
    await this.fetchAccountDetails();
    this.showLoader = false;
  }

  async fetchAccountDetails() {
    const web3 = this.web3service.logThings();

    try {
      if (typeof web3.currentProvider['enable'] !== 'undefined') {
        await web3.currentProvider['enable'](); // Request account access if needed
      }

      const accounts = await web3.eth.requestAccounts();
      this.userAddress = accounts[0];
      console.log('User Address:', this.userAddress);

      const balance = await web3.eth.getBalance(this.userAddress);
      this.userBalance = web3.utils.fromWei(balance, 'ether');
      console.log('User Balance:', this.userBalance);
      this.toastr.success('User Balance: ' + this.userBalance);
    } catch (error) {
      console.error('Error requesting accounts:', error);
      this.toastr.error('Error requesting account.');
    }
  }

  toggleConnection() {
    if (this.isConnected) {
      this.disconnectAccount();
    } else {
      this.connectAccount();
    }
  }

  connectAccount() {
    if (ethereum && ethereum.request) {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            this.isConnected = true;
            this.fetchAccountDetails();
          } else {
            this.isConnected = false;
          }
        })
        .catch((error: any) => {
          console.error('Error requesting accounts:', error);
          this.isConnected = false;
        });
    } else {
      console.error('MetaMask not found. Make sure MetaMask is installed and unlocked.');
      this.isConnected = false;
    }
  }

  disconnectAccount() {
    // Add logic to disconnect the account if needed
    this.isConnected = false;
  }
}
