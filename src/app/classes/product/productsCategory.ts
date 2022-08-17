export interface Language {
    name: string;
    url: string;
}

export interface Description {
    description: string;
    language: Language;
}

export interface ItemResult {
    name: string;
    url: string;
}

export interface Language2 {
    name: string;
    url: string;
}

export interface Name {
    language: Language2;
    name: string;
}

export interface RootObject {
    descriptions: Description[];
    id: number;
    items: ItemResult[];
    name: string;
    names: Name[];
}


