import {SignIn} from "@/components/common/SignIn-Page/SignInpage";

export default function SchoolSignIn() {
    return (<SignIn loginSuccessLink={"/schools/dashboard"} forgetPasswordLink={'/schools/forget-password'} ></SignIn>)
}
