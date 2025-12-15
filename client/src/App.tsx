import { Switch, Route, Router as WouterRouter } from "wouter";
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
import News from "@/pages/news";
import Submit from "@/pages/submit";
import { LanguageProvider } from "./lib/language-context";
import { useHashLocation } from "./lib/hash-location";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/data-map" component={DataMap} />
        <Route path="/platforms" component={Platforms} />
        <Route path="/resource/:id" component={ResourceDetail} />
        <Route path="/publisher/:id" component={PublisherProfile} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/news" component={News} />
        <Route path="/advertise" component={Advertise} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/my-page" component={MyPage} />
        <Route path="/submit" component={Submit} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
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
