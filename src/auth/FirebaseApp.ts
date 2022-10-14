import {getApps, initializeApp} from '@firebase/app'
import {getAuth} from '@firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCsF4MlM5Zi5Kn_Ye7U9clkWZ3Mv3TF808',
    authDomain: 'allomancy-3b2fa.firebaseapp.com',
    projectId: 'allomancy-3b2fa',
    storageBucket: 'allomancy-3b2fa.appspot.com',
    messagingSenderId: '823691412309',
    appId: '1:823691412309:web:1f22fbd734746d3de0a5dc',
    measurementId: 'G-N46YH4WER9',
}

if (!getApps().length) {
    // init firebase
    initializeApp(firebaseConfig)
}

export const auth = getAuth()
export default firebaseConfig;
