import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    onBeforeStepChange = async (step) => true,
    isFinalStepLoading = false,
    backButtonText = "Back",
    nextButtonText = "Next",
    ...rest
}) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [direction, setDirection] = useState(0);
    const [isStepChanging, setIsStepChanging] = useState(false);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isLastStep = currentStep === totalSteps;

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(step => step - 1);
        }
    };

    const handleNext = async () => {
        setIsStepChanging(true);
        if (await onBeforeStepChange(currentStep)) {
            if (!isLastStep) {
                setDirection(1);
                setCurrentStep(step => step + 1);
            }
        }
        setIsStepChanging(false);
    };

    const handleComplete = () => {
        onFinalStepCompleted();
    };

    const isButtonLoading = isStepChanging || isFinalStepLoading;

    return (
        <div className={cn("flex flex-1 flex-col items-center justify-center p-4 !pt-24 sm:aspect-[4/3] md:aspect-[2/1]", rest.className)} {...rest}>
            <Card className="card mx-auto w-full max-w-2xl rounded-4xl shadow-xl p-6">
                <CardHeader>
                    <div className="steps-indicator flex w-full items-center p-4 px-0">
                        {stepsArray.map((_, index) => {
                            const stepNumber = index + 1;
                            return (
                                <React.Fragment key={stepNumber}>
                                    <StepIndicator step={stepNumber} currentStep={currentStep} />
                                    {index < totalSteps - 1 && <StepConnector isComplete={currentStep > stepNumber} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </CardHeader>
                <CardContent className={'!px-0 md:!px-5'}>
                    <StepContentWrapper currentStep={currentStep} direction={direction}>
                        {stepsArray[currentStep - 1]}
                    </StepContentWrapper>
                </CardContent>
                <CardFooter>
                    <div className="px-0 pb-2 w-full">
                        <div className={`mt-10 flex ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
                            {currentStep > 1 && (
                                <Button onClick={handleBack} variant="ghost" disabled={isButtonLoading}>
                                    {backButtonText}
                                </Button>
                            )}
                            <Button onClick={isLastStep ? handleComplete : handleNext} disabled={isButtonLoading}>
                                {isButtonLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                {isLastStep ? "Complete" : nextButtonText}
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

function StepContentWrapper({ currentStep, direction, children }) {
    const [parentHeight, setParentHeight] = useState(0);

    return (
        <motion.div
            style={{ position: "relative", overflow: "hidden" }}
            animate={{ height: parentHeight }}
            transition={{ type: "spring", duration: 0.4 }}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                <SlideTransition
                    key={currentStep}
                    direction={direction}
                    onHeightReady={(h) => setParentHeight(h)}
                >
                    {children}
                </SlideTransition>
            </AnimatePresence>
        </motion.div>
    );
}

function SlideTransition({ children, direction, onHeightReady }) {
    const containerRef = useRef(null);
    useLayoutEffect(() => {
        if (containerRef.current) {
            onHeightReady(containerRef.current.offsetHeight);
        }
    }, [children, onHeightReady]);

    const variants = {
        enter: (dir) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
        center: { x: "0%", opacity: 1 },
        exit: (dir) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
    };

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", width: "100%" }}
        >
            {children}
        </motion.div>
    );
}

export function Step({ children }) {
    return <div className="p-1">{children}</div>;
}

function StepIndicator({ step, currentStep }) {
    const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";
    return (
        <motion.div animate={status} className="relative">
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: "var(--muted)", color: "var(--foreground)" },
                    active: { scale: 1.1, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" },
                    complete: { scale: 1, backgroundColor: "var(--primary)" },
                }}
                transition={{ duration: 0.3 }}
                className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
            >
                {status === "complete" ? <CheckIcon className="h-4 w-4 text-white" /> : <span>{step}</span>}
            </motion.div>
        </motion.div>
    );
}

function StepConnector({ isComplete }) {
    return (
        <div className="relative mx-2 h-0.5 flex-1 rounded bg-muted">
            <motion.div
                className="absolute left-0 top-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: isComplete ? "100%" : 0 }}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}

function CheckIcon(props) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}