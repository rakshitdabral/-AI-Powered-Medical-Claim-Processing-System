import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth, handleLogout } from "@/firebase/firebase";
import { analyzeImage } from "@/services/Openai";
import axios from "axios";
import {
  AlertTriangle,
  BarChart2,
  CheckCircle,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Upload
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Homepage() {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
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

  const navigate = useNavigate()

  const handleFileUpload =async (event) => {
    const file = event.target.files[0];
    if (file) {
      try{
        const analysis = await analyzeImage(file);
        console.log("File Uploaded Successfully" , analysis)
      }catch (error){
        console.error("Error uploading file" , error)
      }
    }
  };

  const fetchRecentClaims = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/invoice/recent/${userId}`);
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
              <Button onClick={()=>{navigate('/homepage')}} variant="ghost" className="w-full justify-start cursor-pointer" size="lg">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Claims
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" size="lg">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" size="lg">
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
              <p className="font-medium">{user?.displayName || 'Guest User'}</p>
              <p className="text-sm text-muted-foreground">Admin</p>
            </div>
          </div>
          <Button onClick={()=>handleLogout()} variant="outline" className="w-full mt-4 cursor-pointer" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered medical claim processing system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                +24 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Claims</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,072</div>
              <p className="text-xs text-muted-foreground">
                83.5% approval rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Claims</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">212</div>
              <p className="text-xs text-muted-foreground">
                16.5% flagged rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="col-span-2 overflow-x-hidden overflow-y-scroll">
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <p className="text-sm text-muted-foreground">
                Last 5 processed claims in the system
              </p>
            </CardHeader>
            <CardContent className="">
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

          <Card>
            <CardHeader>
              <CardTitle>Upload New Claim</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upload a medical invoice to process
              </p>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-center mb-2">
                  Drag and drop your invoice here
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF, JPG, PNG formats
                </p>
                <Button 
                  className="cursor-pointer"
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Homepage;