import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type CardProps = React.ComponentProps<"div"> & {
  variants?: VariantProps<typeof cardVariants>;
  house?: VariantProps<typeof cardVariants>["house"];
};

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm p-4 border rounded-md shadow-sm",
  {
    variants: {
      house: {
        Gryffindor: [
          "bg-gryffindor/70",
          "border-gryffindor-strong",
          "text-red-950",
          "hover:bg-gryffindor/75",
        ],
        Hufflepuff: [
          "bg-hufflepuff/70",
          "border-hufflepuff-strong",
          "text-yellow-950",
        ],
        Ravenclaw: [
          "bg-ravenclaw/70",
          "border-ravenclaw-strong",
          "text-blue-950",
          "hover:bg-ravenclaw/75",
        ],
        Slytherin: [
          "bg-slytherin/70",
          "border-slytherin-strong",
          "text-green-950",
          "hover:bg-slytherin/75",
        ],
        Unknown: [
          "bg-gray-300",
          "border-gray-500",
          "text-gray-950",
          "hover:bg-gray/75",
        ],
      },
    },
    defaultVariants: {
      house: "Unknown",
    },
  },
);

function Card({ className, house, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ house }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
