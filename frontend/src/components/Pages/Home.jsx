import React from "react";
import{ Link }from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, Card } from "@/components/ui/card"
import { Hospital } from "lucide-react";

import LoginForm from "../Forms/LoginForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Hospital className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Kwahu Government Hospital</h1>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900 mb-4">
              Daily Ward State
            </h2>
          </div>
          <Card className="w-full max-w-sm mx-auto">
            <CardContent className="p-6">
              <LoginForm></LoginForm>
            </CardContent>
          </Card>
        </div>
      </main>
    </div> 
  );
};

export default Home;
