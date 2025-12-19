'use client';

import { useParams, useRouter, notFound } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { LoginForm, RegisterForm } from '@/components/AuthForms';
import styles from './Auth.module.css';

type AuthType = 'login' | 'register';

export default function AuthPage() {
  const params = useParams();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authType = params.authType as AuthType;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (authType !== 'login' && authType !== 'register') {
    notFound();
  }

  const isLogin = authType === 'login';
  const backgroundImage = isLogin
    ? '/images/auth-login-bg.png'
    : '/images/auth-register-bg.png';

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image
          src={backgroundImage}
          alt=""
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>

      <div className={styles.formSection}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.svg" alt="ToolNext" width={124} height={20} />
        </Link>

        <div className={styles.formWrapper}>
          <h1 className={styles.title}>
            {isLogin ? 'Вхід' : 'Реєстрація'}
          </h1>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <p className={styles.switchText}>
            {isLogin ? (
              <>
                Не маєте акаунту?{' '}
                <Link href="/auth/register" className={styles.switchLink}>
                  Реєстрація
                </Link>
              </>
            ) : (
              <>
                Вже маєте акаунт?{' '}
                <Link href="/auth/login" className={styles.switchLink}>
                  Вхід
                </Link>
              </>
            )}
          </p>
        </div>

        <div className={styles.copyright}>© {new Date().getFullYear()} ToolNext</div>
      </div>
    </div>
  );
}
