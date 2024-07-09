import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import styles from '../../../css/Login.module.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Request Management System</h2>

            <form onSubmit={submit} className={styles.loginForm}>
                <div className={styles.inputField}>
                    <InputLabel htmlFor="name" value="Name" className={styles.inputLabel} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={`${styles.textInput} mt-1 block w-full`}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className={styles.inputError} />
                </div>

                <div className={styles.inputField}>
                    <InputLabel htmlFor="email" value="Email" className={styles.inputLabel} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`${styles.textInput} mt-1 block w-full`}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className={styles.inputError} />
                </div>

                <div className={styles.inputField}>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className={styles.inputLabel} />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`${styles.textInput} mt-1 block w-full`}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className={styles.inputError} />
                </div>

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className={styles.submitButton} disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>

                {/* Login link at the bottom center */}
                <div className="flex justify-center mt-4">
                    <div className="text-sm text-center">
                        <p className="text-gray-600">Already have an account?
                            <Link href={route('login')} className="text-black">
                                &nbsp;<u>Login</u>
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
