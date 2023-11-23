import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Web3Service } from 'src/app/service/web3.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailMetamaskComponent } from '../detail-metamask/detail-metamask.component';
import Web3 from 'web3';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/service/transaction.service';
import { ExchangeDailyRate } from '../model/exchange-daily-rate';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExchangeRateService } from '../service/exchange-rate.service';

declare let ethereum: any;

@Component({
  selector: 'app-meta-mask',
  templateUrl: './meta-mask.component.html',
  styleUrls: ['./meta-mask.component.scss'],
})
export class MetaMaskComponent implements OnInit {
  exchangeDailyRates!: ExchangeDailyRate;

  showLoader = false;
  userAddress!: string;
  userBalance!: string;
  userName!: string;
  userAvatar: string | null = null;
  userMethod: any;
  tokenImage!: string;
  tokenDecimals!: any;
  transactions!: Transaction[];
  dollarRate!: number;

  totalValue!: number;

  ethRate!: number;

  swapvalue: FormGroup;

  constructor(
    private toastr: ToastrService,
    private web3service: Web3Service,
    public dialog: MatDialog,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private exchangeRate: ExchangeRateService,
    private el: ElementRef
  ) {
    this.swapvalue = this.formBuilder.group({
      bnbValue: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      usdtValue: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
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

    try {
      this.dollarRate = await this.exchangeRate.getExchangeRate('ETH', 'USD');
      this.ethRate = await this.exchangeRate.getExchangeRate('USD', 'ETH');
    } catch (error) {
      console.error('Error getting exchange rates', error);
    }
  }

  addToken() {
    const tokenAddress = '0xb60e8dd61c5d32be8058bb8eb970870f07233155';
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
      console.error(
        'MetaMask not found. Make sure MetaMask is installed and unlocked.'
      );
    }
  }

  deposit() {
    const web3 = new Web3(ethereum);
    const fromAddress = '0x4d6BFBCE5DfADA991A51F97174834395048A84FA';
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
    transaction.status = 'accepted';
    this.toastr.success('Transaction accepted!');
  }

  rejectTransaction(transaction: Transaction) {
    transaction.status = 'rejected';
    this.toastr.error('Transaction rejected!');
  }

  checkSwapValue() {
    console.log('value', this.swapvalue.value);

    if (this.swapvalue) {
      const bnbV = this.swapvalue.get('bnbValue')?.value;
      const dollarV = this.swapvalue.get('usdtValue')?.value;

      const totalValue = dollarV / 0.0043;
      this.totalValue = totalValue;

      if (totalValue) {
        console.log('BNB Value:', this.totalValue);
      }

      if (this.swapvalue) {
        console.log('User Enter BNB Value: ', bnbV);

        console.log('User Enter Dollar Value: ', dollarV);
      }
    }

    this.swapvalue.reset();
  }

  formatPhoneNumber(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    const match = input.match(/^(\d{0,9})(\d{0,0})/);

    if (match) {
      const formatted = match[1] + (match[1] && match[2] ? ' ' : '') + match[2];
      event.target.value = formatted;
    }
  }

  @ViewChild('imgZooming', { static: false }) imgZooming!: ElementRef;

  zoomedIn: boolean = false;

  zoomingSetting() {
    this.zoomedIn = !this.zoomedIn;

    const imgElement = this.imgZooming.nativeElement as HTMLImageElement;

    if (this.zoomedIn) {
      imgElement.style.width = '1000px';
      imgElement.style.height = 'auto';
    } else {
      imgElement.style.width = 'auto';
      imgElement.style.height = 'auto';
    }
  }
}
