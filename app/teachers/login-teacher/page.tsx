import TeacherLogin from "@/components/common/teacherLogin/teacherLogin";
import React from "react";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  return (
    <div>
      <TeacherLogin />
    </div>
  );
}

export default Login;
