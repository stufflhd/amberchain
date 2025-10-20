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
// import { useNavigate } from 'react-router-dom';
import { loginFields } from '@/constants/formFields';
import { loginUser } from '@/services/auth';

export default function LoginForm() {
    const { t } = useTranslation();
    const [agreedToTerms, setAgreedToTerms] = useState(true);
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(true);
    const [showAgreementError, setShowAgreementError] = useState(false);
    const [manualAgreement, setManualAgreement] = useState(true);
    // const navigate = useNavigate();

    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
        mode: 'onChange',
        defaultValues: loginFields.reduce((acc, field) => ({
            ...acc,
            [field.name]: ''
        }), {})
    });

    const mutation = useMutation({
        mutationFn: loginUser,
    });

    const onFormSubmit = async (data) => {
        console.log(data)
        try {
            await handleApiRequest(
                () => mutation.mutateAsync(data),
                {
                    loading: t('loginForm.notifications.loading'),
                    success: t('loginForm.notifications.success'),
                    error: t('common.generic-error'),
                }
            );
            
        } catch (err) {
            console.error(err)
        }
    };

    const isReadyToSubmit = isValid && agreedToTerms && agreedToPrivacy;

    return (
        <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{t('loginForm.welcome')}</h1>
                    <p className="text-muted-foreground text-balance">
                        {t('loginForm.subtitle')}
                    </p>
                </div>

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: t('validation.emailRequired'),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t('validation.invalidEmail')
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
                            autoComplete='username'
                        />
                    )}
                />

                <div className="grid gap-1">
                    <div className="flex items-center">
                        <label className="text-foreground text-sm leading-4 font-medium">
                            {t('loginForm.passwordLabel')} <span className="text-destructive ml-1 h-min leading-0">*</span>
                        </label>
                        <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                            {t('loginForm.forgotPassword')}
                        </a>
                    </div>

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: t('validation.passwordRequired'),
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                                message: t('validation.passwordComplexity')
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
                                autoComplete='current-password'
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={!isReadyToSubmit || isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? t('loginForm.notifications.loading') : t('loginForm.loginButton')}
                </Button>

                <div className="text-center text-sm">
                    {t('loginForm.noAccount')}{' '}
                    <a href="/auth/register" className="underline underline-offset-4">
                        {t('loginForm.signUp')}
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
                {!showAgreementError ? (
                    <span>{t('agreement.clickingAgree')}&nbsp;</span>
                ) : (
                    <span className='text-destructive text-center text-xs flex'>{t('agreement.mustAgree')}&nbsp;</span>
                )}
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
                <span className={showAgreementError ? 'text-destructive' : ''}>&nbsp;{t('and')}&nbsp;</span>
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