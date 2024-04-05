import { FC, ReactNode } from 'react';
import { Setting } from '../dashboardlayout/setting';
import { Heading } from '@/components/common/Heading';
interface IProps {
  children: ReactNode;
  title: string;
}

export const SettingsLayout: FC<IProps> = ({ title, children }) => {
  return (
    <div className="flex justify-stretch min-h-screen">
      <div className="block w-full overflow-hidden">
        <Heading text={title} className="" fontWeight="font-semibold" />
        <Setting />
        <div className="settings-layout">{children}</div>
      </div>
    </div>
  );
};

SettingsLayout.displayName = 'SettingsLayout';
export default SettingsLayout;
