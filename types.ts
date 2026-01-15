export enum DeityId {
  GANESH = 'ganesh',
  HANUMAN = 'hanuman',
  SHIVA = 'shiva',
  DURGA = 'durga',
  LAKSHMI = 'lakshmi',
  KRISHNA = 'krishna',
  RAM = 'ram',
  SARASWATI = 'saraswati',
  VISHNU = 'vishnu',
  VAISHNO = "vaishno",
  KALI = "mahakali",

}

export enum ContentType {
  AARTI = 'Aarti',
  CHALISA = 'Chalisa',
  MANTRA = 'Mantra'
}

export interface Deity {
  id: DeityId;
  name: string;
  hindiName: string;
  image: string;
  color: string;
  description: string;
}

export interface DevotionalContent {
  title: string;
  verses?: string[]; // For Aarti and Mantra (backward compatible)
  sections?: {
    doha?: string[];
    chaupai?: string[];
    [key: string]: string[] | undefined; // Allow other section types
  };
  meaning?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
