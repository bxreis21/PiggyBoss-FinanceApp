from calendar import monthrange
from datetime import date, timedelta

from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import CreditCardBill, Transaction


def get_or_create_current_credit_card_bill(transaction):
    """Create or reuse the current-month credit card bill for a given transaction."""
    if transaction.payment_method != 'credit':
        return None

    if not transaction.user_id or not transaction.bank_id:
        return None

    bank_account = transaction.bank
    if bank_account is None:
        return None

    tx_date = transaction.date or date.today()
    billing_day = bank_account.billing_day or 1
    due_day = bank_account.due_day or 10

    if tx_date.day < billing_day:
        start_date = date(tx_date.year, tx_date.month, 1)
    else:
        start_date = date(tx_date.year, tx_date.month, billing_day)

    if start_date.month == 12:
        next_month = date(start_date.year + 1, 1, 1)
    else:
        next_month = date(start_date.year, start_date.month + 1, 1)

    maturity_date = next_month - timedelta(days=1)
    maturity_date = date(maturity_date.year, maturity_date.month, min(due_day, monthrange(maturity_date.year, maturity_date.month)[1]))

    bill, _ = CreditCardBill.objects.get_or_create(
        user=transaction.user,
        bank=transaction.bank,
        start_date=start_date,
        defaults={
            'maturity_date': maturity_date,
            'status': 'unpaid',
        },
    )
    return bill


@receiver(post_save, sender=Transaction)
def attach_transaction_to_credit_card_bill(sender, instance, created, **kwargs):
    """Attach credit transactions to the current-month credit card bill."""
    if not created:
        return

    if instance.payment_method != 'credit':
        return

    if instance.credit_card_bill_id:
        return

    bill = get_or_create_current_credit_card_bill(instance)
    if bill is None:
        return

    Transaction.objects.filter(pk=instance.pk).update(credit_card_bill=bill)
    instance.credit_card_bill = bill
