import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import FormField from "@/components/form/FormField";
import PasswordField from "@/components/form/PasswordField";
import { Button } from "@/components/ui/button";
import AgreementDialog from './AgreementDialog';
import { useTranslation } from "react-i18next";
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { handleApiRequest } from '@/lib/handleApiRequest';

export default function LoginForm() {
    const { t } = useTranslation();
    const [agreedToTerms, setAgreedToTerms] = useState(true);
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(true);
    const [showAgreementError, setShowAgreementError] = useState(false);
    const [manualAgreement, setManualAgreement] = useState(true);

    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            return res.json();
        },
    });

    const onFormSubmit = async (data) => {
        try {
            await handleApiRequest(
                () => mutation.mutateAsync(data),
                {
                    loading: 'Logging in...',
                    success: 'Logged in successfully!',
                    error: 'Login failed',
                }
            );
        } catch (err) {
            alert(err)
        }
    };

    const isReadyToSubmit = isValid && agreedToTerms && agreedToPrivacy;

    return (
        <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                        Login to your AMBERCHAIN account
                    </p>
                </div>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address."
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <FormField
                            label="Email"
                            placeholder="m@example.com"
                            onChange={(payload) => field.onChange(payload.value)}
                            value={field.value}
                            name={field.name}
                            error={error?.message}
                            isValueValid={!error}
                            onBlur={field.onBlur}
                        />
                    )}
                />

                <div className="grid gap-1">
                    <div className="flex items-center">
                        <label className="text-foreground text-sm leading-4 font-medium">
                            Password <span className="text-destructive ml-1 h-min leading-0">*</span>
                        </label>
                        <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required.",
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
                                message: "Password must be 6+ chars, with an uppercase letter and a special character."
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <PasswordField
                                className="flex-1"
                                onChange={(payload) => field.onChange(payload.value)}
                                value={field.value}
                                name={field.name}
                                error={error?.message}
                                isValueValid={!error}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={!isReadyToSubmit || isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>

                <div className="text-center text-sm">
                    Don't have an account?{' '}
                    <a href="/auth/register" className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </form>

            <label htmlFor="terms" className="text-muted-foreground flex flex-wrap justify-center items-center text-xs mt-6">
                <Checkbox
                    checked={agreedToTerms && agreedToPrivacy}
                    id='terms'
                    onCheckedChange={(checked) => {
                        setAgreedToPrivacy(checked === true)
                        setAgreedToTerms(checked === true)
                        setShowAgreementError(checked !== true)
                        setManualAgreement(checked === true)
                    }}
                    className={`size-4 mr-2 ${showAgreementError && '!border !border-destructive'}`}
                />
                {!showAgreementError ? (<span>By clicking login, you agree to our&nbsp;</span>) : (<span className='text-destructive text-center text-xs flex'>You must agree to our&nbsp;</span>)}
                <AgreementDialog
                    title={t('loginForm.agreement_terms')}
                    sections={t('terms.sections', { returnObjects: true })}
                    onAgree={() => setAgreedToTerms(true)}
                    onOpen={() => {
                        if (manualAgreement) {
                            setManualAgreement(false)
                            setAgreedToTerms(false)
                            setAgreedToPrivacy(false)
                        }
                    }}
                />
                <span className={showAgreementError ? 'text-destructive' : ''}>&nbsp;and&nbsp;</span>
                <AgreementDialog
                    title={t('loginForm.agreement_privacy')}
                    sections={t('privacy.sections', { returnObjects: true })}
                    onAgree={() => setAgreedToPrivacy(true)}
                    onOpen={() => {
                        if (manualAgreement) {
                            setManualAgreement(false)
                            setAgreedToTerms(false)
                            setAgreedToPrivacy(false)
                        }
                    }}
                />
                <span>.</span>
            </label>
        </div>
    );
}