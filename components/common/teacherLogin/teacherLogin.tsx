import React from "react";
import TopNavbar from "../navbar/TopNavbar";
import Progressbar from "../Progressbar/Progressbar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import CountrySelectDropdown, {
  CountrySelectDropdownProps,
} from "../countryDropdown/CountryDropdown";
import BottomNavbar from "../navbar/bottomNavbar";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { DropdownMenuDemo } from "../LanguageDropdown/LanguageDropdown";
import ChipSelector from "@/components/ui/ChipSelect/ChipSelector";

const formSchema = z.object({
  username: z.string().min(2).max(50).nonempty("Username is required"),
  emailAddress: z
    .string()
    .email("Invalid email address")
    .nonempty("Email address is required"),
  country: z.string().nonempty("Country is required"),
  language: z.string().nonempty("Language is required"),
  chip: z.string().nonempty("Gender is required"),
});

const TeacherLogin: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      emailAddress: "",
      country: "",
      language: "",
      chip: "",
    },
  });

  const continueFormaData = () => {
    console.log(form.getValues());
    form.reset();
    form.setValue("username", "");
    form.setValue("emailAddress", "");
    form.setValue("country", "");
    form.setValue("language", "");
    handleSubmit();
  };
  const handleLogout = () => {
    handleSubmit();
  };

  interface progressbarProps {
    heading: "Your Progress";
    percentage: 50;
  }

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });
  const DropdownMenuDemoPropsOptions = {
    options: [
      {
        label: "Pakistan",
        value: "en",
        flagUrl: "/asserts/flags/pakistanFlagLogo.svg",
        altName: "pak",
      },
      {
        label: "Hindi",
        value: "fr",
        flagUrl: "/asserts/flags/indiaFlagLogo.svg",
        altName: "HN",
      },
      {
        label: "English(Uk)",
        value: "es",
        flagUrl: "/asserts/flags/UnFlag.svg",
        altName: "UK",
      },
      {
        label: "English(US)",
        value: "es",
        flagUrl: "/asserts/flags/sudiaFlag.svg",
        altName: "US",
      },
    ],
  };
  const countrySelectDropdownProps: CountrySelectDropdownProps = {
    options: [
      {
        name: "Pakistan",
        countryCode: "US",
        flagUrl: "/assets/flags/pakistanFlagLogo.svg",
      },
      {
        name: "India",
        countryCode: "GB",
        flagUrl: "/assets/flags/indiaFlagLogo.svg",
      },
      {
        name: "United Kingdom",
        countryCode: "IN",
        flagUrl: "/assets/flags/UnFlag.svg",
      },
      {
        name: "Saudi Arabia",
        countryCode: "CN",
        flagUrl: "/assets/flags/sudiaFlag.svg",
      },
    ],

    label: "Select Country",
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <TopNavbar onLogout={handleLogout} className="fixed top-0 w-full z-50 " />

      <div className=" p-4 mb-36 mx-auto ">
        <div className="">
          <div className="mx-auto mt-7 md:w-96">
            <Progressbar heading={"progresbar"} percentage={50} />
          </div>
          <div className="mx-auto w-max mt-4">
            <h1 className="text-[#4146B8] text-2xl font-mono not-italic font-bold leading-10">
              Create your profile
            </h1>
            <p>Learn grow, and thrive together!</p>
          </div>
        </div>

        <div className="md:w-3/4 mx-auto  md:justify-around ">
          <div className="">
            <Form {...form}>
              <form className="grid grid-cols-1  md:grid-cols-2 gap-4 content-center mt-4 ">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="">Full Name</FormLabel>
                        <FormMessage />
                        <FormControl>
                          <Input
                            placeholder="Enter username"
                            {...field}
                            className="h-[54px] md:w-[600px] w-full"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormMessage />
                        <FormControl>
                          <Input
                            placeholder="e.g example@12"
                            {...field}
                            className="h-[54px] md:w-[600px] w-full"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => {
                    return (
                      <div className="md:w-[600px] w-full ">
                        <FormLabel className="">Country</FormLabel>
                        <FormMessage />
                        <CountrySelectDropdown
                          {...countrySelectDropdownProps}
                        />
                      </div>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => {
                    return (
                      <div className="md:w-[600px] w-full  ">
                        <FormLabel className="">Gender</FormLabel>
                        <ChipSelector
                          options={[
                            {
                              label: "Male",
                              value: "Male",

                              render: (data: any) => {
                                return <div>{data.label}</div>;
                              },
                            },
                            {
                              label: "Female",
                              value: "Female",
                              render: (data: any) => <div>{data.label}</div>,
                            },
                            {
                              label: "Non-binary",
                              value: "Non-binary",
                              render: (data: any) => <div>{data.label}</div>,
                            },
                          ]}
                        />
                      </div>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => {
                    return (
                      <div className="md:w-[600px] w-full ">
                        <FormLabel className="">Language</FormLabel>
                        <FormMessage>
                          {form.formState.errors.language?.message}
                        </FormMessage>
                        <DropdownMenuDemo {...DropdownMenuDemoPropsOptions} />
                      </div>
                    );
                  }}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 left-0">
        <BottomNavbar
          onContinue={continueFormaData}
          onBackButton={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default TeacherLogin;
