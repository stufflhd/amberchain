import React, { useState } from 'react';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleButton = (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={props.disabled}
            tabIndex={-1}
        >
            {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
            </span>
        </Button>
    );

    return (
        <FormField
            {...props}
            type={showPassword ? 'text' : 'password'}
            endContent={toggleButton}
        />
    );
}