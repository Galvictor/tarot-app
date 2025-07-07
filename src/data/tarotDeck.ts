export interface TarotCard {
    id: number;
    name: string;
    image: string;
    description: string;
  }
  
  export const tarotDeck: TarotCard[] = [
    {
      id: 1,
      name: "O Louco",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
      description: "Novos começos, espontaneidade, fé."
    },
    {
      id: 2,
      name: "O Mago",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
      description: "Vontade, poder, ação e habilidade."
    },
    {
      id: 3,
      name: "A Sacerdotisa",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
      description: "Intuição, mistério, conhecimento interior."
    },
    {
      id: 4,
      name: "A Imperatriz",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
      description: "Fertilidade, natureza, beleza."
    },
    {
      id: 5,
      name: "O Imperador",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
      description: "Autoridade, estrutura, controle."
    },
    // ... adicione mais se quiser
  ];
  