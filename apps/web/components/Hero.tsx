import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden ">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-float" />
      <div
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container px-4 md:px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center max-w-6xl mx-auto relative z-10 space-y-14">
        <div className="inline-block animate-fade-in">
          <div className="inline-flex items-center justify-center px-4 py-1.5 text-xs md:text-sm border border-primary/20 hover:border-primary/40 transition-colors rounded-full bg-background/50 backdrop-blur-sm text-foreground font-medium mb-6">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2">
              New
            </span>
            <span>Train your custom AI model today</span>
          </div>
        </div>

        <div
          className="space-y-6 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            Generate stunning images with
            <span className="text-gradient ml-2">your own custom AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Train your personal AI model with your own images and generate
            unlimited custom artwork in your unique style.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button className="px-8 py-6 text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
