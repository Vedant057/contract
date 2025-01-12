import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { NextResponse } from "next/server";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    // Generate a document id
    const documentId = crypto.randomUUID();

    // Convert file to blob
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Load and parse PDF
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    // Add documentId to metadata of each chunk
    const docsWithMetadata = splitDocs.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        documentId,
      },
    }));

    //summary
    const AI_MODEL = "gemini-pro";
    const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);
    const aiModel = genAI.getGenerativeModel({ model: AI_MODEL });

    const prompt = 
      `Summarize the following document: ${splitDocs[0].pageContent}
    `;

    const results = await aiModel.generateContent(prompt);
    const clearing = results.response;
    const summary = clearing.text().trim().replace(/\*/g, '');
    

    // Store in Pinecone with metadata
    const embeddings = new GoogleGenerativeAIEmbeddings({  
      apiKey: process.env.AI_API_KEY!,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    await PineconeStore.fromDocuments(docsWithMetadata, embeddings, {
      pineconeIndex: index,
    });


    return NextResponse.json({
      summary,
      documentId,
      pageCount: docs.length,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}