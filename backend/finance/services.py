import calendar
from datetime import date
from dateutil.relativedelta import relativedelta
from django.contrib.auth.models import User
from .models import BankAccount, CreditCardBill

def get_safe_date(year: int, month: int, target_day: int) -> date:
    """
    Returns a valid date, capping the day at the month's maximum.
    """
    _, max_days = calendar.monthrange(year, month)
    return date(year, month, min(target_day, max_days))


def get_or_create_credit_invoice(user: User, bank: BankAccount, transaction_date: date) -> CreditCardBill:
    """
    Find out the correct credit invoice for a given transaction date.
    """
    current_reference = transaction_date.replace(day=1)
    before = current_reference - relativedelta(months=1)
    closing_day = bank.billing_day

    current_bill_date = get_safe_date(current_reference.year, current_reference.month, closing_day)
    current_start_date = get_safe_date(before.year, before.month, closing_day)

    target_bill, _ = CreditCardBill.objects.get_or_create(
        user=user,
        bank=bank,
        reference_date=current_reference,
        defaults={
            'start_date': current_start_date,
            'billing_date': current_bill_date
        }
    )

    # If transaction is after closing day, move to next invoice
    if transaction_date >= target_bill.billing_date:
        next_reference = current_reference + relativedelta(months=1)
        
        next_bill_date = get_safe_date(next_reference.year, next_reference.month, closing_day)
        next_start_date = get_safe_date(current_reference.year, current_reference.month, closing_day)

        target_bill, _ = CreditCardBill.objects.get_or_create(
            user=user,
            bank=bank,
            reference_date=next_reference,
            defaults={
                'start_date': next_start_date,
                'billing_date': next_bill_date
            }
        )
        return target_bill

    return target_bill