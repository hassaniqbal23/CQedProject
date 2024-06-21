'use client';

import { Button, Input } from '../../ui';
import { SelectCountry } from '../../ui/select-v2/select-v2-components';

export interface UniversitySettingProps {
  buttonClick?: () => void;
}

export const UniversitySettingPage: React.FC<UniversitySettingProps> = ({
  buttonClick,
}) => {
  return (
    <div className="grid gap-10 items-center px-10">
      <div className="flex flex-col  gap-3">
        <label htmlFor="" className="text-lg font-semibold  mt-10">
          University name
        </label>
        <Input type="name" placeholder="Enter the name of your university" />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className=" flex flex-col gap-3">
          <label htmlFor="" className="text-lg font-semibold">
            Email Address
          </label>
          <Input type="email" placeholder="Enter your university email" />
        </div>

        <div className="w-full flex flex-col gap-3">
          <label htmlFor="" className="text-lg font-semibold">
            Phone
          </label>
          <Input placeholder="Enter your Number" type="number" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-lg font-semibold">
            Country
          </label>
          <SelectCountry label="" placeholder="Select your country" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-lg font-semibold">
            State
          </label>
          <SelectCountry label="" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="" className="text-lg font-semibold">
          University name
        </label>
        <Input type="name" placeholder="Enter the name of your university" />
      </div>
      <div>
        <Button onClick={buttonClick}>Save Settings</Button>
      </div>
    </div>
  );
};
