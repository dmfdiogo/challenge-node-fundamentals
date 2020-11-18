import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public getTransactions(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance: Balance = transactions.reduce(
      (accumulator: Balance, currentTransaction: Transaction) => {
        switch (currentTransaction.type) {
          case 'income':
            accumulator.income += currentTransaction.value;
            break;
          case 'outcome':
            accumulator.outcome += currentTransaction.value;
            break;
          default:
            break;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      initialBalance,
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
