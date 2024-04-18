import {
  Dropdown,
  DropdownMenuDemoPropsOptions,
} from "@/components/ui/dropdown-menu/dropdown-menu";

export interface DropdownMenuDemoProps {
  options: DropdownMenuDemoPropsOptions[];
}

export function DropdownMenuDemo(props: DropdownMenuDemoProps) {
  return (
    <div className="m-auto">
      <Dropdown
        options={props.options}
        label="Language Select"
        // onChange={(data: any) => console.log(data, "data")}
        multSelect={true}
      />
    </div>
  );
}
