from rest_framework import serializers
from .models import (
    Institution,
    BankAccount,
    Category,
    ThirdParty,
    Transaction,
    CreditCardBill,
)


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

    balance_type = serializers.ChoiceField(
        choices=[
            ('expenses', 'Expenses'),
            ('income', 'Income'),
        ],
        error_messages={
            'invalid_input': 'invalid balance_type'
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
        read_only_fields = ['user']

    transactions_type = serializers.ChoiceField(
        choices=[
            ('income', 'Income'),
            ('expense', 'Expense'),
        ],
        error_messages={
            'invalid_input': 'Transaction type input must be income or expense'
        }
    )

    payment_method = serializers.ChoiceField(
        choices=[
            ('debit', 'Debit'),
            ('credit', 'Credit'),
        ],
        error_messages={
            'invalid_choice': 'The payment_method must be one of the following: Debit or Credit'
        }
    )

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
