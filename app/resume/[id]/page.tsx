"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ExternalLink, Loader2 } from "lucide-react";

const RESUME_PDF = "/AjitYadav_Resume_21102026.pdf";
const RESUME_FILENAME = "AjitYadav_Resume_21102026.pdf";

type Status = "downloading" | "done" | "error";

export default function SharedResumePage() {
  const [status, setStatus] = useState<Status>("downloading");

  useEffect(() => {
    let objectUrl: string | null = null;

    const download = async () => {
      try {
        const response = await fetch(RESUME_PDF);
        if (!response.ok) throw new Error("fetch failed");
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = RESUME_FILENAME;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        setStatus("done");
      } catch {
        setStatus("error");
      } finally {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      }
    };

    download();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 space-y-5"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-700 flex items-center justify-center">
          {status === "downloading" ? (
            <Loader2 size={32} className="text-white animate-spin" />
          ) : (
            <CheckCircle2 size={32} className="text-white" />
          )}
        </div>

        <h1 className="text-2xl font-bold">Ajit Yadav&apos;s Resume</h1>

        <p className="text-sm text-neutral-400">
          {status === "downloading" && "Downloading your resume..."}
          {status === "done" && "Download complete! View the resume in the portfolio, or download it again below."}
          {status === "error" && "Couldn't start the download automatically — use the buttons below."}
        </p>

        <div className="w-full h-1 rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: status === "downloading" ? "70%" : "100%" }}
            transition={{ duration: status === "downloading" ? 8 : 0.4, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-teal-500 to-teal-700"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/?resume=open"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-all duration-300"
          >
            <ExternalLink size={20} />
            View Resume in Portfolio
          </Link>
          <a
            href={RESUME_PDF}
            download={RESUME_FILENAME}
            className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-neutral-200 rounded-lg px-6 py-3 font-medium hover:bg-neutral-800 transition-all duration-300"
          >
            <Download size={20} />
            Download Again
          </a>
        </div>
      </motion.div>
    </div>
  );
}
