'use client';
import React from 'react';
import { Button, Input } from '../../ui';
import { Typography } from '@/components/common/Typography/Typography';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { Label } from '@radix-ui/react-label';

export interface UniversityIntegrationProps {
  buttonClick?: () => void;
}

export const UniversityIntegrationPage: React.FC<
  UniversityIntegrationProps
> = ({ buttonClick }) => {
  return (
    <div className="px-10">
      <div>
        <Typography variant="h3" weight="semibold" className="my-8">
          SSO Provider
        </Typography>
        <div className="grid gap-10 grid-cols-2">
          <div className="w-full  flex flex-col gap-3 ">
            <Label htmlFor="fullName" className="font-semibold text-lg">
              Select SSO Provider
            </Label>
            <MultipleSelector
              className="py-4 bg-[#F8F9FB]"
              options={[
                { value: 'English', label: 'English' },
                { value: 'Udru', label: 'Udru' },
                { value: 'russian', label: 'Russian' },
              ]}
              placeholder="Select provider"
            />
          </div>
          <div className="w-full flex flex-col gap-3 ">
            <Label htmlFor="fullName" className="font-semibold text-lg">
              Custom Provider
            </Label>
            <Input placeholder="Enter custom provider" />
          </div>
        </div>
      </div>

      <div className="">
        <Typography variant="h3" weight="semibold" className="mt-4 mb-7">
          Account Credentials
        </Typography>

        <div className="">
          <div className="grid gap-10 grid-cols-2 items-center">
            <div className="w-full py-2 flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Client ID
              </Label>
              <Input placeholder="Client ID" type="number" />
            </div>
            <div className="w-full flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Client Secret
              </Label>
              <Input placeholder="******" type="password" />
            </div>
          </div>
          <div className="grid gap-10 grid-cols-2 items-center mt-7">
            <div className="w-full py-2 flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Tenant ID
              </Label>
              <Input placeholder="Tenant ID" type="number" />
            </div>
            <div className="w-full flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Issuer URL
              </Label>
              <Input placeholder="Issuer URL" type="text" />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Typography variant="h3" weight="semibold" className="my-8">
          URLConfiguration
        </Typography>

        <div className="">
          <div className="grid gap-10 grid-cols-2 items-center">
            <div className="w-full py-2 flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Redirect URL
              </Label>
              <Input placeholder="Login redirect URL" type="text" />
            </div>
            <div className="w-full flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Logout URL
              </Label>
              <Input placeholder="Logout redirect URL" type="text" />
            </div>
          </div>
          <div className="grid gap-10 grid-cols-2 items-center mt-7">
            <div className="w-full py-2 flex flex-col gap-3 ">
              <Label htmlFor="fullName" className="font-semibold text-lg">
                Logout URL
              </Label>
              <Input placeholder="Logout redirect URL" type="text" />
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={buttonClick}>
        Save Settings
      </Button>
    </div>
  );
};
