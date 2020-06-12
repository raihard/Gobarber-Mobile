import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErros';
import Logo from '../../assets/logo.png';
import Imput from '../../components/Input';
import Button from '../../components/Button';

import { Container, Titulo, Botao, BotaoTexto, Icon } from './styles';

interface SignInFormData {
    name: string;
    email: string;
    password: string;
}
const SignUp: React.FC = () => {
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);
    const handleSingUp = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('Senha obrigatório')
                    .min(6, 'No mínimo 6 Digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            const { name, email, password } = data;
            api.post('users', { name, email, password })
                .then(response => {
                    Alert.alert(
                        'Cadastrado com sucesso!',
                        'Bem vindo ao Gobaber, Faça o seu login!',
                    );
                    navigation.goBack();
                })
                .catch((err: { status: string; message: string }) => {
                    console.log(err);
                    Alert.alert(
                        'Erro no cadastro',
                        'Ocorreu umerro ao fazer fazer o cadastro, Tente novamente',
                    );
                });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErros(error));
            } else {
                // Alert.alert(
                //     'Erro no cadastro',
                //     'Ocorreu umerro ao fazer fazer o cadastro',
                // );
            }
        }
    }, []);
    const navigation = useNavigation();
    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                }}
            >
                <Container>
                    <Image source={Logo} />
                    <Titulo>Crie sua conta</Titulo>
                    <Form ref={formRef} onSubmit={handleSingUp}>
                        <Imput
                            autoCapitalize="words"
                            icon="user"
                            name="name"
                            placeholder="Nome"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus();
                            }}
                        />
                        <Imput
                            ref={emailInputRef}
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="mail"
                            name="email"
                            keyboardType="email-address"
                            placeholder="E-mail"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus();
                            }}
                        />
                        <Imput
                            ref={passwordInputRef}
                            icon="lock"
                            name="password"
                            placeholder="Senha"
                            secureTextEntry
                            textContentType="newPassword"
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                        />
                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Cadastar
                        </Button>
                    </Form>
                </Container>

                <Botao
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="arrow-left" size={20} />
                    <BotaoTexto>Voltar para logon</BotaoTexto>
                </Botao>
            </ScrollView>
        </>
    );
};

export default SignUp;
