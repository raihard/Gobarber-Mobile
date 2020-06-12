import React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Container } from './styles';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
    const { SignOut } = useAuth();
    return (
        <Container>
            <Text>Dashboard</Text>
            <Button onPress={SignOut}>Sair</Button>
        </Container>
    );
};
export default Dashboard;
