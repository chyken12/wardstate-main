import React from "react";
import{ Link }from 'react-router-dom'
import DatePicker from "../DatePicker";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import AdmissionForm from "../Forms/AdmissionForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AllAdmissions from "./AllAdmissions";

const Home = () => {
  return (
    <div>
      <AllAdmissions></AllAdmissions>
    </div>
  );
};

export default Home;
