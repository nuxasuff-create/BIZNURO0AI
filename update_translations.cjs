const fs = require('fs');

let content = fs.readFileSync('utils/translations.ts', 'utf8');

const newBn = `
    // Login
    loginTitle: 'স্বাগতম',
    loginDesc: 'আপনার BIZNURO AI ড্যাশবোর্ডে প্রবেশ করতে সাইন ইন করুন',
    signupTitle: 'অ্যাকাউন্ট তৈরি করুন',
    signupDesc: 'BIZNURO AI দিয়ে শুরু করতে সাইন আপ করুন',
    emailLabel: 'ইমেইল ঠিকানা',
    emailPlaceholder: 'আপনার ইমেইল লিখুন',
    passwordLabel: 'পাসওয়ার্ড',
    passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
    signInBtn: 'লগইন করুন',
    signUpBtn: 'অ্যাকাউন্ট তৈরি করুন',
    testLoginBtn: 'টেস্ট লগইন (অ্যাডমিন)',
    noAccount: 'অ্যাকাউন্ট নেই?',
    createOne: 'তৈরি করুন',
    alreadyHaveAccount: 'অ্যাকাউন্ট আছে?',
    signInInstead: 'লগইন করুন',
    googleSignIn: 'গুগল দিয়ে চালিয়ে যান',
    verificationCode: 'ভেরিফিকেশন কোড',
    verificationDesc: 'আপনার মেইলে পাঠানো ৬ সংখ্যার কোডটি দিন',
    verifyBtn: 'যাচাই করুন',
`;

const newEn = `
    // Login
    loginTitle: 'Welcome Back',
    loginDesc: 'Sign in to access your BIZNURO AI dashboard',
    signupTitle: 'Create an Account',
    signupDesc: 'Sign up to get started with BIZNURO AI',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    signInBtn: 'Sign In',
    signUpBtn: 'Create Account',
    testLoginBtn: 'Test Login (Admin)',
    noAccount: 'Don\\'t have an account?',
    createOne: 'Create one',
    alreadyHaveAccount: 'Already have an account?',
    signInInstead: 'Sign In',
    googleSignIn: 'Continue with Google',
    verificationCode: 'Verification Code',
    verificationDesc: 'Enter the 6-digit code sent to your email',
    verifyBtn: 'Verify',
`;

content = content.replace(/bengali: 'বাংলা',/, "bengali: 'বাংলা'," + newBn);
content = content.replace(/bengali: 'Bengali',/, "bengali: 'Bengali'," + newEn);

fs.writeFileSync('utils/translations.ts', content);
