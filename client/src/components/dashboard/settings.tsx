import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Settings() {
  
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    
    <div className="container mx-auto py-2">
      <Avatar className="size-32">
        <AvatarImage src={user?.profilePicture || ""} />
          <AvatarFallback>
              {user?.displayName?.charAt(0) || ""}
          </AvatarFallback>
        </Avatar>
      <div className="grid gap-8 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={user.displayName}
                id="name"
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={user.email}
                id="email"
                readOnly
                className="bg-gray-100"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Your account is managed through Google. If you want to change your
              email, please contact us.
            </p>
          </CardContent>
        </Card>

        {/* <Card>
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>Your membership details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-md bg-green-600/10 p-1 pr-2 text-xs font-medium text-green-600">
                    <div className="m-0.5 rounded-full bg-green-600/10 p-[3px]">
                      <Check size={16} className="text-foreground" />
                    </div>
                    Active membership
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lifetime membership granted
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <p>
                  Thank you for your support. Enjoy the benefits of premium.
                </p>
              </div>
            </CardContent>
          </Card> */}
      </div>
    </div>
  );
}