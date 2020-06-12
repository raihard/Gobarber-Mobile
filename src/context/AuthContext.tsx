import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import api from '../services/api';
import asyncStorage from '@react-native-community/async-storage';

interface SignInProps {
    email: string;
    password: string;
}

// interface SignUpProps extends SignInProps {
//   name: string;
//   // email: string;
//   // password: string;
// }

interface AuthState {
    token: string;
    user: object;
}

interface AuthContextData {
    user: object;
    CtxSignIn(data: SignInProps): Promise<void>;
    // SignUp(data: SignUpProps): Promise<void>;
    SignOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        asyncStorage.multiGet(
            ['GithabExplore:token', 'GithabExplore:user'],
            (err, stores) => {
                if (stores) {
                    const token = stores[0][1];
                    const user = stores[1][1];
                    if (token && user)
                        setData({ token, user: JSON.parse(user) });
                    setLoading(false);
                }
            },
        );
    }, []);

    const CtxSignIn = useCallback(
        async ({ email, password }) => {
            console.log('CtxSignIn email', email);
            console.log('CtxSignIn password', password);

            const respose = await api.post<AuthState>('sessions', {
                email,
                password,
            });
            const { token, user } = respose.data;
            asyncStorage.setItem('GithabExplore:token', token);
            asyncStorage.setItem('GithabExplore:user', JSON.stringify(user));
            setData({ token, user });

            console.log('Api: token', token);
            console.log('Api: user', user);

            // const { token, user } = data;
            // asyncStorage.multiSet([
            //     ['GithabExplore:token', token],
            //     ['GithabExplore:user', JSON.stringify(user)],
            // ]);

            // asyncStorage.setItem('GithabExplore:token', token);
            // asyncStorage.setItem('GithabExplore:user', JSON.stringify(user));

            // setData({ token, user });
        },
        [data],
    );

    const SignOut = useCallback(async () => {
        asyncStorage.multiRemove([
            '@GithabExplore:token',
            '@GithabExplore:user',
        ]);
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.user, CtxSignIn, SignOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Utilizar useAuth com AuthProvider');
    return context;
}
export { useAuth, AuthProvider };
