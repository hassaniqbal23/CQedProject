import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  schoolName: z.string().refine((value) => value.trim() !== "", {
    message: "Please enter your School name",
  }),
  emailAddress: z
    .string()
    .email()
    .refine((value) => value.trim() !== "", {
      message: "Please enter your email address.",
    }),
  phoneNumber: z.string().refine((value) => value.trim() !== "", {
    message: "Please enter your phone number.",
  }),
  country: z.string().refine((value) => value.trim() !== "", {
    message: "Please select your Country.",
  }),
  state: z.string().refine((value) => value.trim() !== "", {
    message: " Please select your State.",
  }),
  schoolAddress: z.string().refine((value) => value.trim() !== "", {
    message: " Please enter School address.",
  }),
});

export function SchoolDetailsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      state: "",
      schoolAddress: "",
    },
  });

  const onSubmit = form.handleSubmit((values, field: any) => {
    // ✅ This will be type-safe and validated.
    console.log(values);
  });

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8">
        <div className="flex flex-col justify-center items-center mb-4">
          <h1
            className="text-[#4146B8] font-bold text-2xl 
"
          >
            Add your school details
          </h1>
          <h3 className="font-semibold text-[#a3adbc] text-[17px] ">
            Create your school profile
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g John, Emma"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Address and Phone inputs */}
              <div className=" grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g example@12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+442" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Country and State inputs */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g California" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* School Address input with width of */}
              <FormField
                control={form.control}
                name="schoolAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g 123 Main St"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
