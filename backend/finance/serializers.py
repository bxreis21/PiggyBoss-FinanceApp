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


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"
        read_only_fields = ['created_at', 'updated_at']


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = "__all__"
        read_only_fields = ['user']
        depth = 1

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


class TransactionSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user

        if validated_data.get('payment_method') == PaymentMethod.CREDIT:
            bank = validated_data['bank_account']
            transaction_date = validated_data['date']

            bill = get_or_create_credit_invoice(
                user=user,
                bank=bank,
                transaction_date=transaction_date
            )
            validated_data['credit_card_bill'] = bill

        return super().create(validated_data)


class CreditCardBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardBill
        fields = "__all__"
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)