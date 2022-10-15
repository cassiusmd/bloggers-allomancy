import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
} from '@firebase/auth';
import { auth } from './FirebaseApp';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential === null) throw new Error('credential is invalid');

            const token = credential.accessToken;
            // The signed-in profile info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the profile's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

interface EmailSignInResult {
    success: boolean;
    message?: string;
    error?: string;
}

const EmailSignIn = async (
    email: string,
    password: string
): Promise<EmailSignInResult> => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log('logged in');
            const user = userCredential.user;
            return { success: true };
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { success: false, error: errorMessage };
        });
};
const EmailRegister = async (
    email: string,
    password: string
): Promise<EmailSignInResult> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            sendEmailVerification(user).then(() => {
                return { success: true, message: 'Verification email sent' };
                // Email verification sent!
                // ...
            });
            return { success: true };
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { success: false, error: errorMessage };
            // ..
        });
};

const ResetPassword = async (email: string): Promise<EmailSignInResult> => {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            return { success: true, message: 'Recover email sent' };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { success: false, error: errorMessage };
            // ..
        });
};

const logout: () => Promise<void> = () => {
    return auth.signOut();
};

// export all functions
export {
    auth,
    signInWithGoogle,
    EmailSignIn,
    EmailRegister,
    ResetPassword,
    sendPasswordResetEmail,
    logout,
};
