import { cn } from "@/lib/utils";
import {
  ArrowRight,
  FileSearch,
  Globe,
  Hourglass,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";


const features = [
  {
    title: "AI-powered Analysis",
    description:
      "Leverage advanced AI to analyze contracts quickly and accurately.",
    icon: FileSearch,
  },
  {
    title: "Risk Identification",
    description: "Spot potential risks and opportunities in your contracts.",
    icon: ShieldCheck,
  },
  {
    title: "Streamlined Negotiation",
    description: "Accelerate the negotiation process with AI-driven insights.",
    icon: Hourglass,
  },
  {
    title: "Cost Reduction",
    description: "Significantly reduce legal costs through automation.",
    icon: PiggyBank,
  },
  {
    title: "Improved Compliance",
    description: "Ensure your contracts meet all regulatory requirements.",
    icon: Scale,
  },
  {
    title: "Faster Turnaround",
    description: "Complete contract reviews in minutes instead of hours.",
    icon: Zap,
  },
];

export function HeroSection() {
  return (
    <>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
        <Link
          href={"/dashboard"}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 py-2 mb-4 rounded-full hidden md:flex"
          )}
        >
          <span className="mr-3 hidden md:block">
            <Sparkles className="size-3.5" />
          </span>
          Introducing Simple Metrics for your team
        </Link>
        <div className="text-center mb-12 w-full">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text mb-4">
            Revoltionzie Your Contracts
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Harness the power of AI to analyze, understand, and optimize your
            contracts in no time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={"/dashboard"}
            >
            <Button
              className="inline-flex items-center justify-center text-lg"
              size={"lg"}
            >
              Get Started
              <ArrowRight className="ml-2 size-5" />
            </Button>
            </Link>
            <Button
              className="inline-flex items-center justify-center text-lg"
              size={"lg"}
              variant={"outline"}
            >
              Learn More
              <Globe className="ml-2 size-5" />
            </Button>
          </div>

          <div className='mx-auto max-w-3xl px-6 lg:px-8'>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <Image
                  src='/pdf.png'
                  alt='product preview'
                  width={1364}
                  height={866}
                  quality={100}
                  layout="responsive"
                  className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12 mt-12">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature section */}
    <div className='mx-auto mb-32  max-w-4xl'>
      <div className='mb-12 px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
            Start chatting in minutes
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Chatting to your PDF files has never been
            easier than with Quill.
          </p>
        </div>
      </div>


      {/* steps */}
      <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-sm font-medium text-blue-600'>
              Step 1
            </span>
            <span className='text-xl font-semibold'>
              Sign up for an account
            </span>
            <span className='mt-2 text-zinc-700'>
              Either starting out with a free plan or
              choose our{' '}
              <Link
                href='/pricing'
                className='text-blue-700 underline underline-offset-2'>
                pro plan
              </Link>
              .
            </span>
          </div>
        </li>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-sm font-medium text-blue-600'>
              Step 2
            </span>
            <span className='text-xl font-semibold'>
              Upload your PDF file
            </span>
            <span className='mt-2 text-zinc-700'>
              We&apos;ll process your file and make it
              ready for you to chat with.
            </span>
          </div>
        </li>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-sm font-medium text-blue-600'>
              Step 3
            </span>
            <span className='text-xl font-semibold'>
              Start asking questions
            </span>
            <span className='mt-2 text-zinc-700'>
              It&apos;s that simple. Try out Quill today -
              it really takes less than a minute.
            </span>
          </div>
        </li>
      </ol>

      <div className='mx-auto max-w-6xl px-6 lg:px-8 flex'>
        <div className='mt-16 flex flex-1 sm:mt-24 gap-20'>
          <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <Image
              src='/pdf.png'
              alt='uploading preview'
              width={672}
              height={420}
              quality={100}
              layout="responsive"
              className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
            />
          </div>
          <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <Image
              src='/pdf.png'
              alt='uploading preview'
              width={672}
              height={420}
              quality={100}
              layout="responsive"
              className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
            />
          </div>
        </div>
      </div>
      
      </div>
    </section>
      </>
  );
}