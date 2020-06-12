import styled from 'styled-components/native';
import IconFeather from 'react-native-vector-icons/Feather';
// import { ScrollView } from 'react-native-gesture-handler';

// export const ScrollView = styled.ScrollView``;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 80px;
`;
// export const ScrollView = styled.ScrollView`
//     border: 1px;
// `;

export const Titulo = styled.Text`
    color: #fff;
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    margin-top: 70px;
    margin-bottom: 20px;
`;

export const Botao = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 60px;
    flex-direction: row;
    height: 60px;
    background: #312e38;
    align-items: center;
    justify-content: center;
    border-top-width: 1px;
    border-color: #122129;
`;
export const BotaoTexto = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;
export const Icon = styled(IconFeather)`
    color: #f4ede8;
    margin-right: 10px;
`;
