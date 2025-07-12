"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, GraduationCap, MapPin, Edit } from "lucide-react"

export default function ProfileView({ user, onEdit }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="text-2xl">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">{user?.name}</CardTitle>
        <CardDescription>
          <Badge variant="secondary" className="mt-2">
            {user?.provider === "credentials" ? "Email Account" : `${user?.provider} Account`}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-base">{user?.name || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{user?.email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <GraduationCap className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">University</p>
              <p className="text-base">{user?.university || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-base">{user?.address || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={onEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-4 border-t">
          <p>Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          {user?.updatedAt && <p>Last updated {new Date(user?.updatedAt).toLocaleDateString()}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
