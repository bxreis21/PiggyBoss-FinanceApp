from rest_framework import serializers
from .models import (
    Institution,
    BankAccount,
    Category,
    ThirdParty,
    Transaction,
    CreditCardBill,
)
from .enums import PaymentMethod, TransactionType
from .services import get_or_create_credit_invoice

from datetime import date


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"
        read_only_fields = ['created_at', 'updated_at']


class BankAccountSerializer(serializers.ModelSerializer):
    institution = InstitutionSerializer(read_only=True)

    class Meta:
        model = BankAccount
        fields = "__all__"
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['user']

    transaction_type = serializers.ChoiceField(
        choices=TransactionType.choices,
        error_messages={
            'invalid_input': f'Invalid transaction type. Must be one of: {TransactionType.choices}'
        }
    )

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class ThirdPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdParty
        fields = "__all__"
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CreditCardBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardBill
        fields = "__all__"
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class TransactionSerializer(serializers.ModelSerializer):
    bank = BankAccountSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    credit_card_bill = CreditCardBillSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = ['user', 'credit_card_bill']

    transactions_type = serializers.ChoiceField(
        choices=TransactionType.choices,
        error_messages={
            'invalid_input': f'Invalid transaction type. Must be one of: {TransactionType.choices}'
        }
    )

    payment_method = serializers.ChoiceField(
        choices=PaymentMethod.choices,
        error_messages={
            'invalid_choice': f'Invalid payment method. Must be one of: {PaymentMethod.choices}'
        }
    )

    @staticmethod
    def redirect_credit_transaction(user, validated_data):
        bank = validated_data['bank']
        transaction_date = validated_data.get("date", date.today())

        bill = get_or_create_credit_invoice(
            user=user,
            bank=bank,
            transaction_date=transaction_date
        )
        validated_data['credit_card_bill'] = bill
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user

        if validated_data.get('payment_method') == PaymentMethod.CREDIT:
            TransactionSerializer.redirect_credit_transaction(
                user=user,
                validated_data=validated_data
            )

        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if validated_data.get('payment_method') == PaymentMethod.CREDIT:
            TransactionSerializer.redirect_credit_transaction(
                user=user,
                validated_data=validated_data
            )

        return super().update(instance, validated_data)