// transaction.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: 'pending' | 'accepted' | 'rejected';
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  addTransaction(transaction: Transaction) {
    const currentTransactions = this.transactions.getValue();
    this.transactions.next([...currentTransactions, transaction]);
  }
}
