import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Web3Service } from 'src/app/service/web3.service';
import { MatDialog, } from '@angular/material/dialog'
import { DetailMetamaskComponent } from '../detail-metamask/detail-metamask.component';
import Web3 from 'web3';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/service/transaction.service';

declare let ethereum: any;

@Component({
  selector: 'app-meta-mask',
  templateUrl: './meta-mask.component.html',
  styleUrls: ['./meta-mask.component.scss']
})
export class MetaMaskComponent implements OnInit {

  showLoader = false;
  userAddress!: string;
  userBalance!: string;
  userName!: string;
  userAvatar: string | null = null;
  userMethod: any;
  tokenImage!: string;
  tokenDecimals!: any;
  transactions!: Transaction[];

  constructor(private toastr: ToastrService, private web3service: Web3Service, public dialog: MatDialog, private transactionService: TransactionService) {

  }
  showDetail() {
    this.dialog.open(DetailMetamaskComponent);
  }
  async ngOnInit() {

    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });

    this.showLoader = true;

    const web3 = this.web3service.logThings();

    try {
      if (typeof web3.currentProvider['enable'] !== 'undefined') {
        await web3.currentProvider['enable']();
      }

      const accounts = await web3.eth.requestAccounts();
      this.userAddress = accounts[0];

      const balance = await web3.eth.getBalance(this.userAddress);
      this.userBalance = web3.utils.fromWei(balance, 'ether');

    } catch (error) {
      console.error('Error requesting accounts:', error);
      this.toastr.error('Error requesting account.');
    }

    setTimeout(() => {
      this.showLoader = false;
    });

  }


  addToken() {
    const tokenAddress = '0xb60e8dd61c5d32be8058bb8eb970870f07233155'; // Replace with your token address
    const tokenSymbol = 'FOO';
    const tokenDecimals = 18;
    const tokenImage = 'https://foo.io/token-image.svg';

    if (typeof ethereum !== 'undefined') {
      ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        })
        .then((success: boolean) => {
          if (success) {
            console.log(`${tokenSymbol} successfully added to wallet!`);
          } else {
            throw new Error('Something went wrong.');
          }
        })
        .catch(console.error);
    } else {
      console.error('MetaMask not found. Make sure MetaMask is installed and unlocked.');
    }
  }

  deposit() {
    const web3 = new Web3(ethereum);
    const fromAddress = '0xe392223890ade3d20587f53851f6ef3ed38087fe';
    const toAddress = '0x9c14a874C776c2d58FB54Dcf5519A0f50655fa1b';
    const amountInEth = 1;
    const amountInWei = web3.utils.toWei(amountInEth.toString(), 'ether');
    const transactionObject = {
      from: fromAddress,
      to: toAddress,
      value: amountInWei,
    };

    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionObject],
      })
      .then((txHash: string) => {
        console.log(`Transaction sent: ${txHash}`);

      })
      .catch((error: any) => {
        console.error('Error sending transaction:', error);
      });
  }

  acceptTransaction(transaction: Transaction) {
    // Update the transaction status to 'accepted'
    transaction.status = 'accepted';
    this.toastr.success('Transaction accepted!');
  }

  // Function to handle transaction rejection
  rejectTransaction(transaction: Transaction) {
    // Update the transaction status to 'rejected'
    transaction.status = 'rejected';
    this.toastr.error('Transaction rejected!');
  }

}
