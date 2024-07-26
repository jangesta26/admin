import * as React from "react";
import { DayPicker  } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  captionLayout,
  classNames,
  className,
  defaultMonth,
  ...props
}: CalendarProps) {

  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        nav: "space-x-1 flex items-start",
        chevron:"bg-primary/90 hover:bg-primary/50 text-white rounded ",
        dropdown:'bg-primary/90 text-white rounded scroll-smooth focus:scroll-auto ',
        dropdowns:"flex mt-1 gap-1 text-sm font-light",
        caption_label:"hidden ",
        month:"flex flex-col items-start space-y-4 ",
        weekdays:"flex gap-3.5 px-1 ",
        weekday:"font-semibold",
        weeks:"grid grid-col-7 gap-1 px-1",
        month_caption:"flex justify-center pt-1 relative items-center",
        today: `border`,
        selected: `bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary focus:text-white`,
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-full aria-selected:opacity-100"
        ),
        range_end:"day-range-end",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
          ...classNames,
      }}
      captionLayout={captionLayout}
      modifiersClassNames={{
        book:"h-9 w-9 p-0 font-normal rounded-full aria-selected:opacity-100",
      }}
      defaultMonth={defaultMonth}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
