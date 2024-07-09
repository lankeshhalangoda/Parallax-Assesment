import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import styles from '../../../css/Login.module.css';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Request Management System</h2>

            <form onSubmit={submit} className={styles.loginForm}>
                <div className={styles.inputField}>
                    <InputLabel htmlFor="email" value="Email" className={styles.inputLabel} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`${styles.textInput} mt-1 block w-full`}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className={styles.inputError} />
                </div>

                <div className={styles.inputField}>
                    <InputLabel htmlFor="password" value="Password" className={styles.inputLabel} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`${styles.textInput} mt-1 block w-full`}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className={styles.inputError} />
                </div>

                <div className={`${styles.rememberMe} block mt-4`}>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className={styles.rememberMeCheckbox}
                        />
                        <span className={styles.rememberMeLabel}>Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className={styles.submitButton} disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                <div className="flex justify-center mt-4">
                    <div className="text-sm text-center">
                        <p className="text-gray-600">Don't have an account?
                        <Link href={route('register')} className="text-black">
                            &nbsp;<u>Register</u>
                        </Link></p>
                    </div>
                </div>


            </form>
        </GuestLayout>
    );
}
