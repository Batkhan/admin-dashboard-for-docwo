import { useParams, Link } from "react-router";
import { useUser } from "../hooks/useUsers";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { ErrorFallback } from "../components/ui/ErrorFallback";
import { ArrowLeft, Mail, Phone, Building, Briefcase } from "lucide-react";

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser(id || null);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <ErrorFallback message={error} />
        <div className="mt-4 text-center">
          <Link to="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-12 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <Card className="border-t-4 border-t-primary">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-6 pb-4">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full border-4 border-white shadow-sm bg-gray-100"
          />
          <div>
            <CardTitle className="text-3xl font-bold text-text-primary">
              {user.firstName} {user.lastName}
            </CardTitle>
            <p className="text-text-secondary mt-1 capitalize font-medium">{user.role}</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 pt-6 border-t border-border">
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary pb-2">Contact Information</h4>
            <div className="flex items-center text-text-secondary">
              <Mail className="h-4 w-4 mr-3 text-gray-400" />
              {user.email}
            </div>
            <div className="flex items-center text-text-secondary">
              <Phone className="h-4 w-4 mr-3 text-gray-400" />
              {user.phone}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary pb-2">Professional Details</h4>
            <div className="flex items-center text-text-secondary">
              <Building className="h-4 w-4 mr-3 text-gray-400" />
              {user.company.name}
            </div>
            <div className="flex items-center text-text-secondary">
              <Briefcase className="h-4 w-4 mr-3 text-gray-400" />
              {user.company.title}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
