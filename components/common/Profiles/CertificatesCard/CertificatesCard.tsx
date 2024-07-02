import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import React from 'react';
import { Image } from '../../Image';
import { Calendar } from 'lucide-react';

interface ICertificate {
  id: string;
  name: string;
  issueName: string;
  date: string;
}

interface ICertificatesProps {
  certificates: ICertificate[];
  title: string;
}

export const ProfileCertificates: React.FC<ICertificatesProps> = ({
  certificates,
  title,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {certificates.length ? (
          certificates?.map((certificate: ICertificate, index: number) => (
            <div
              key={index}
              className="flex items-center bg-[#ECEDF8] mb-4 rounded-2xl px-2 md:px-4 "
            >
              <Image
                src="/assets/profile/badgegold.svg"
                height={24}
                width={25}
              />
              <div className="p-2 md:p-4 text-left ml-2 ">
                <h3 className="font-semibold text-base text-[#393939]">
                  {certificate.name}
                </h3>
                <div className="mt-1">
                  <p className="text-sm my-1">{certificate.issueName}</p>
                  <p className="text-sm flex items-center">
                    <Calendar color="#393939" size={15} className="mr-2" />
                    {certificate.date}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center bg-[#ECEDF8] mb-4 rounded-2xl px-2 py-4 md:px-4 ">
            No certifications yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

ProfileCertificates.displayName = 'ProfileCertificates';
