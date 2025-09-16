import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
// @ts-ignore
import { resumes } from "constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMentor" },
    { name: "description", content: "Analyze your resume to land your dream job!" },
  ];
}

export default function Home() {
  // Getting loading state and auth from Puter
    const { isLoading, auth } = usePuterStore();
    // const location = useLocation();
    // const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    // To handle redirect if user is logged in or not
    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    {/* {window.puter.ai.chat()} */}
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-Powered feedback!</h2>
      </div>

    {resumes?.length > 0 && (
      <div className="resumes-section">
        {/* Mapping over an array that contains different resumes */}
        {resumes.map((resume: Resume) => (
          <ResumeCard key={resume.id} resume={resume}/>
        ))}
      </div>
    )}
    </section>
  </main>;
}
