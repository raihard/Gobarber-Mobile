import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.png';
import Imput from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Titulo,
    EsqueciSenha,
    EsqueciSenhaTexto,
    CriarConta,
    CriarContaTexto,
    Icon,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = ({}) => {
    const { CtxSignIn } = useAuth();
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSingIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email é obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            const { email, password } = data;
            console.log('SignIn email', email);
            console.log('SignIn password', password);
            CtxSignIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErros(error));
            } else {
                Alert.alert(
                    'Erro na auteticação',
                    'Ocorreu um erro ao fazer login, E-mail/Senha não confere',
                );
            }
        }
    }, []);

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
                    <Titulo>Faça seu logon</Titulo>
                    <Form ref={formRef} onSubmit={handleSingIn}>
                        <Imput
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="mail"
                            name="email"
                            placeholder="E-mail"
                            keyboardType={'email-address'}
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
                            Entrar
                        </Button>
                    </Form>
                    <EsqueciSenha>
                        <EsqueciSenhaTexto>
                            Esqueci minha senha
                        </EsqueciSenhaTexto>
                    </EsqueciSenha>
                </Container>
                <CriarConta
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                >
                    <Icon name="log-in" size={20} />
                    <CriarContaTexto>Criar Conta</CriarContaTexto>
                </CriarConta>
            </ScrollView>
        </>
    );
};

export default SignIn;
