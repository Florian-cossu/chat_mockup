import Image from "next/image";
import { Minus, ChevronsUpDown, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@components/ui/card";

export default function ChatMockup() {
  return (
    <div className="flex flex-column m-0 p-0 w-[100vw] h-[100vh] items-center justify-items-center justify-center">
      <Card className="w-4/5 m-0 p-0">
        <CardHeader className="flex flex-row m-0 p-0 h-fit items-center justify-end  border-b-1">
          <div className="flex flex-row gap-1.5 p-2">
            <span className="flex rounded-full w-4 h-4 bg-emerald-400 hover:bg-emerald-300 cursor-pointer transitions items-center justify-center">
              <ChevronsUpDown className="w-3 h-3 rotate-45"/>
            </span>
            <span className="flex rounded-full w-4 h-4 bg-amber-400 hover:bg-amber-300 cursor-pointer transitions items-center justify-center">
              <Minus className="w-3 h-3"/>
            </span>
            <span className="flex rounded-full w-4 h-4 bg-red-500 hover:bg-red-400 cursor-pointer transitions items-center justify-center">
              <Plus className="w-3 h-3 rotate-45"/>
            </span>
          </div>
        </CardHeader>
        <CardContent>
        <Image
          className="dark:invert"
          src="/icons/icon-any.svg"
          alt="Icon"
          width={180}
          height={180}
        />
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
