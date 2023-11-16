import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Web3Service } from 'src/app/service/web3.service';


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
  userAvatar!: string;

  constructor(private toastr: ToastrService, private web3service: Web3Service) { }

  async ngOnInit() {
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

      this.toastr.success('User Balance: ' + this.userBalance);
    } catch (error) {
      console.error('Error requesting accounts:', error);
      this.toastr.error('Error requesting account.');
    }

    this.showLoader = false;
  }

}
