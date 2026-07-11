from django.db import models


class PaymentMethod(models.TextChoices):
    CREDIT = 'credit', 'Credit'
    DEBIT = 'debit', 'Debit'


class TransactionType(models.TextChoices):
    INFLOW = 'in', 'Inflow'
    OUTFLOW = 'out', 'Outflow'


class BillStatus(models.TextChoices):
    PAID = 'paid', 'Paid'
    UNPAID = 'unpaid', 'Unpaid'