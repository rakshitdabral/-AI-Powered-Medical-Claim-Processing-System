import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth, handleLogout } from "@/firebase/firebase";
import axios from "axios";
import {
    BarChart2,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Claim() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [recentClaims, setRecentClaims] = useState([]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchRecentClaims(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);


  const fetchRecentClaims = async (userId) => {
    try {
      const response = await axios.get(`https://ai-powered-medical-claim-processing.onrender.com/api/v1/invoice/${userId}`);
      console.log(response)
      if (response.data.success) {
        setRecentClaims(response.data.data);
        
      }
    } catch (error) {
      console.error("Error fetching recent claims:", error);
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6 flex flex-col">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">MediClaim AI</h2>
          <p className="text-sm text-muted-foreground">Processing System</p>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="space-y-2">
            <li>
              <Button
                onClick={() => navigate("/homepage")}
                variant="ghost"
                className="w-full justify-start cursor-pointer"
                size="lg"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer"
                size="lg"
              >
                <FileText className="mr-2 h-4 w-4" />
                Claims
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="lg"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="lg"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-4">
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user?.displayName || "Guest User"}</p>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>
          <Button
            onClick={() => handleLogout()}
            variant="outline"
            className="w-full mt-4 cursor-pointer"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Claims</h1>
          <p className="text-muted-foreground">All your claims in one place</p>
        </div>

        <Card className="col-span-2 mt-3 ">
            <CardContent className=" min-h-[70vh] overflow-y-auto">
              <div className="space-y-4 ">
                {recentClaims.map((claim) => (
                  <div key={claim._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{claim.patientName}</p>
                      <p className="text-sm text-muted-foreground">{claim.diagnosis}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(claim.serviceDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{claim.billAmount}</p>
                      <p className="text-sm text-muted-foreground">Bill Amount</p>
                    </div>
                  </div>
                ))}
                {recentClaims.length === 0 && (
                  <p className="text-center text-muted-foreground">No recent claims found</p>
                )}
              </div>
            </CardContent>
          </Card>
      </main>
    </div>
  );
}

export default Claim;
