import { Tool } from './Tool';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs/promises';
import path from 'path';

interface GoogleCloudVisionOCRToolConfig {
  input_file_path: string;
  output_md_file_path: string;
  credentials_json: any;
  processor_id: string;
  project_id: string;
  location?: string;
}

export class GoogleCloudVisionOCRTool extends Tool {
  private config: GoogleCloudVisionOCRToolConfig;

  constructor(config: GoogleCloudVisionOCRToolConfig) {
    super();
    this.config = {
      ...config,
      location: config.location || 'us'
    };
  }

  async run(): Promise<string> {
    try {
      const client = await this.initializeClient();
      const documentText = await this.processDocument(client);
      await this.saveAsMarkdown(documentText);
      return `Markdown file created at: ${this.config.output_md_file_path}`;
    } catch (error) {
      console.error('Error in GoogleCloudVisionOCRTool:', error);
      throw error;
    }
  }

  private async initializeClient(): Promise<DocumentProcessorServiceClient> {
    try {
      console.log('Initializing client with the following credentials:');
      console.log('Project ID:', this.config.project_id);
      console.log('Processor ID:', this.config.processor_id);
      console.log('Location:', this.config.location);
      console.log('Credentials:', JSON.stringify(this.config.credentials_json, null, 2));

      const auth = new GoogleAuth({
        credentials: this.config.credentials_json,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      return new DocumentProcessorServiceClient({ auth });
    } catch (error) {
      console.error('Error initializing client:', error);
      throw error;
    }
  }

  private async processDocument(client: DocumentProcessorServiceClient): Promise<string> {
    const fileContent = await fs.readFile(this.config.input_file_path);
    const mimeType = this.getMimeType(this.config.input_file_path);

    const processorName = `projects/${this.config.project_id}/locations/${this.config.location}/processors/${this.config.processor_id}`;

    console.log('Processing document with the following config:');
    console.log('Processor Name:', processorName);
    console.log('File MIME Type:', mimeType);
    console.log('File Size:', fileContent.length, 'bytes');

    try {
      const [result] = await client.processDocument({
        name: processorName,
        rawDocument: {
          content: fileContent,
          mimeType: mimeType,
        },
      });

      if (!result.document?.text) {
        throw new Error('No text extracted from the document');
      }

      return result.document.text;
    } catch (error: any) {
      console.error('Detailed error:', JSON.stringify(error, null, 2));
      if (error.code === 3 && error.details.includes('Document pages exceed the limit')) {
        throw new Error('Document exceeds the 15-page limit for OCR processing.');
      }
      throw new Error(`Error processing document: ${error.message}`);
    }
  }

  private async saveAsMarkdown(text: string): Promise<void> {
    await fs.writeFile(this.config.output_md_file_path, text);
  }

  private getMimeType(filePath: string): string {
    const extension = path.extname(filePath).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
      '.tiff': 'image/tiff',
      '.tif': 'image/tiff'
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }
}
