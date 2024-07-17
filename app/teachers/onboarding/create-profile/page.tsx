import OnboardingTeacherCreateProfilePage from '@/components/PageContainers/Teacher/Onboarding/TeacherCreateProfilePage/TeacherCreateProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Profile - Onboarding - Teacher - GCED',
  description: 'Create Profile - Onboarding - Teacher - GCED',
};

const CreateProfile = () => {
  return (
    <OnboardingTeacherCreateProfilePage></OnboardingTeacherCreateProfilePage>
  );
};

export default CreateProfile;
