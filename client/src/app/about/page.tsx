import Footer from '@/components/footer';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-5 text-gray-800">Contract Analysis Tool</h1>
        <p className="text-lg mb-10 text-gray-700">
          This tool is designed to assist in the analysis and understanding of legal contracts. 
          It leverages the power of natural language processing (NLP) to extract key information, 
          identify potential risks, and provide valuable insights. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"> 
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Key Features</h1>
            <ul className="list-disc ml-3 mt-5 text-gray-700">
              <li>Contract Extraction</li>
              <li>Clause Classification</li>
              <li>Risk Identification</li>
              <li>Comparison Analysis</li>
              <li>Data Visualization</li>
            </ul>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Benefits</h1>
            <ul className="list-disc ml-3 mt-5 text-gray-700">
              <li>Increased Efficiency</li>
              <li>Reduced Risk</li>
              <li>Improved Accuracy</li>
              <li>Enhanced Decision Making</li>
              <li>Cost Savings</li>
            </ul>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-5 text-gray-800">About Us</h1>
          <p className="text-gray-600">
            We are a team of passionate developers and legal professionals dedicated to creating innovative solutions for the legal industry. 
            Our goal is to empower legal professionals with cutting-edge technology to streamline their workflows and improve their efficiency.
          </p>
        </div>
      </div>
    <div className="flex-1 hidden lg:block relative mt-40 mr-32">
      <img src="/about.png" alt="" className="absolute right-0 w-118 rounded-lg" /> 
    </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutPage;
    
   