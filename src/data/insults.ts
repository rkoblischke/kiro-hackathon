/**
 * Insult and comeback data for Monster Brawl
 * Each insult has a correctComebackId that maps to the appropriate comeback
 */

import { Insult, Comeback } from '../types';

export const INSULTS: Insult[] = [
  {
    id: 'ins1',
    text: "Your fangs are as dull as your wit!",
    correctComebackId: 'com1'
  },
  {
    id: 'ins2',
    text: "I've seen scarier pumpkins!",
    correctComebackId: 'com2'
  },
  {
    id: 'ins3',
    text: "Your cape is so last century!",
    correctComebackId: 'com3'
  },
  {
    id: 'ins4',
    text: "You call that a scary face? I've seen kittens more frightening!",
    correctComebackId: 'com4'
  },
  {
    id: 'ins5',
    text: "Your castle must be lonely with that personality!",
    correctComebackId: 'com5'
  },
  {
    id: 'ins6',
    text: "Even garlic bread is braver than you!",
    correctComebackId: 'com6'
  },
  {
    id: 'ins7',
    text: "Your coffin called - it wants its boring occupant back!",
    correctComebackId: 'com7'
  },
  {
    id: 'ins8',
    text: "I bet you sparkle in the sunlight like a disco ball!",
    correctComebackId: 'com8'
  }
];

export const COMEBACKS: Comeback[] = [
  {
    id: 'com1',
    text: "At least I have wit to dull!"
  },
  {
    id: 'com2',
    text: "But none as hollow as your head!"
  },
  {
    id: 'com3',
    text: "Fashion is eternal, unlike mortals!"
  },
  {
    id: 'com4',
    text: "Those kittens probably had better taste in capes too!"
  },
  {
    id: 'com5',
    text: "Better lonely than surrounded by peasants!"
  },
  {
    id: 'com6',
    text: "Garlic bread doesn't have to face me!"
  },
  {
    id: 'com7',
    text: "At least I have a coffin - where do you sleep, the forest floor?"
  },
  {
    id: 'com8',
    text: "I'd rather sparkle than wear that ridiculous red hood!"
  }
];
