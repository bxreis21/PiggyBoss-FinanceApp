from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase

from .models import BankAccount, CreditCardBill, Institution, Transaction


class CreditCardBillAutoCreationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='tester', password='secret123')
        self.institution = Institution.objects.create(name='Test Bank')
        self.bank_account = BankAccount.objects.create(user=self.user, institution=self.institution)

    def test_credit_transaction_auto_attaches_to_current_month_bill(self):
        transaction = Transaction.objects.create(
            user=self.user,
            name='Coffee',
            transactions_type='expense',
            amount='12.50',
            payment_method='credit',
            bank=self.bank_account,
            date=date.today(),
        )

        current_bill = CreditCardBill.objects.filter(
            user=self.user,
            bank=self.bank_account,
            start_date__year=date.today().year,
            start_date__month=date.today().month,
        ).first()

        self.assertIsNotNone(current_bill)
        self.assertEqual(transaction.credit_card_bill, current_bill)
