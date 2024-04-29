import {Button} from "@/components/ui";

interface ForgetPasswordSuccessProps {
    title?: string
    description?: string
    email: string,
    onBack?: () => void
}

function ForgetPasswordSuccess(props: ForgetPasswordSuccessProps) {
    const {title = "Password Reset Email Sent", description = `We have  sent We've sent an email to ${props.email} with instructions to reset your password`, email} = props
    return <div className={"text-center"} >
        <h2 className={"text-[30px] mb-3"} >
            {title}
        </h2>
        <p className={"text-[14px] mb-3"} >
            {description}
        </p>
        <Button onClick={ () => props.onBack && props.onBack() }  >Go Back</Button>
    </div>
}

export {ForgetPasswordSuccess}
