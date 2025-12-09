import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DataMap from "@/pages/data-map";
import ResourceDetail from "@/pages/resource-detail";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Advertise from "@/pages/advertise";
import Platforms from "@/pages/platforms";
import PublisherProfile from "@/pages/publisher-profile";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import MyPage from "@/pages/my-page";
import NewItems from "@/pages/new-items";
import { LanguageProvider } from "./lib/language-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/data-map" component={DataMap} />
      <Route path="/platforms" component={Platforms} />
      <Route path="/new" component={NewItems} />
      <Route path="/resource/:id" component={ResourceDetail} />
      <Route path="/publisher/:id" component={PublisherProfile} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/advertise" component={Advertise} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/my-page" component={MyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
