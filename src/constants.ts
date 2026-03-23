import { ContentUnit } from './types';

export const CONTENT_UNITS: ContentUnit[] = [
  {
    id: 'il-quarto-stato',
    title: 'Il Quarto Stato',
    category: 'Masterpiece',
    description: 'Giuseppe Pellizza da Volpedo\'s monumental 1901 work, symbolizing the social and political awakening of the working class.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Quarto_Stato_%28crop%29_%28cropped%29.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    location: { lat: 45.4725, lng: 9.2023, name: 'Main Hall' },
    details: [
      'Painted between 1898 and 1901',
      'Monumental size: 293 x 545 cm',
      'Represents a peaceful protest of workers'
    ]
  },
  {
    id: 'segantini-two-mothers',
    title: 'Le due madri',
    category: 'Masterpiece',
    description: 'Giovanni Segantini\'s 1889 masterpiece, a cornerstone of Italian Divisionism exploring the universal theme of motherhood.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Segantini_-_Die-beiden-M%C3%BCtter-1889_Doppelkarte_ohne-Rand.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    location: { lat: 45.4726, lng: 9.2024, name: 'Divisionism Wing' },
    details: [
      'Symbolist exploration of motherhood',
      'Innovative use of divided color strokes',
      'Awarded the gold medal at the 1889 Paris Exposition'
    ]
  },
  {
    id: 'fiducia-in-dio',
    title: 'La Fiducia in Dio',
    category: 'Sculpture',
    description: 'Lorenzo Bartolini\'s 1835 masterpiece of Purist sculpture, depicting a young woman in prayer with spiritual grace.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Lorenzo_Bartolini_%281777-1850%29_La_fiducia_in_Dio_%281833%29_Museo_Poldi_Pezzoli%2C_Milano.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    location: { lat: 45.4727, lng: 9.2025, name: 'Sculpture Gallery' },
    details: [
      'Commissioned by Rosina Trivulzio Poldi Pezzoli',
      'Inspired by a model resting after a pose',
      'A shift from Neoclassicism to naturalistic Purism'
    ]
  }
];
