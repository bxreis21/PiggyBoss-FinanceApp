from django.db import models
from django.contrib.auth.models import User
from django.utils.formats import dateformat
from colorfield.fields import ColorField
from datetime import date
from .enums import PaymentMethod, TransactionType, BillStatus


class Institution(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='institution_images', null=True, blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Institution"
        verbose_name_plural = "Institutions"

class BankAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bank_accounts")
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, null=True, related_name="bank_accounts")
    billing_day = models.PositiveIntegerField(default=1, help_text="Day of the month when the bill closes.")

    def __str__(self):
        return self.institution.name if self.institution else "Other"

    class Meta:
        verbose_name = "Bank Account"
        verbose_name_plural = "Bank Accounts"

        unique_together = ('user', 'institution')

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='category', null=True, blank=True)
    name = models.CharField(max_length=30, unique=True)
    color = ColorField(default='#FF0000')
    icon = models.ImageField(upload_to='category_images', null=True, blank=True)
    transaction_type = models.CharField(
        max_length=20, 
        choices=TransactionType.choices,
        default=TransactionType.OUTFLOW
    )
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

        unique_together = ('user', 'name')

    def __str__(self):
        return self.name


class ThirdParty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='thirds')
    name = models.CharField(max_length=30)
    relation = models.CharField(max_length=30)  

    class Meta:
        verbose_name = "Third Party"
        verbose_name_plural = "Third Parties"

    def __str__(self):
        return self.name

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    name = models.CharField(max_length=50)
    transactions_type = models.CharField(
        max_length=50,
        choices=TransactionType.choices,
        default=TransactionType.OUTFLOW
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    date = models.DateField(default=date.today)
    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.DEBIT
    )
    bank = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='transactions')
    credit_card_bill = models.ForeignKey('CreditCardBill', on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    third_party = models.ForeignKey(ThirdParty, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return self.name


class CreditCardBill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bills')
    bank = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='bills')
    reference_date = models.DateField()
    start_date = models.DateField()
    billing_date = models.DateField()

    status = models.CharField(max_length=20, 
        choices=BillStatus.choices,
        default=BillStatus.UNPAID
    )

    class Meta:
        verbose_name = "Credit Card Bill"
        verbose_name_plural = "Credit Card Bills"

        unique_together = ('user', 'bank', 'reference_date')

    def __str__(self):
        return f"{dateformat(self.reference_date, "M")}/{self.reference_date.year}"