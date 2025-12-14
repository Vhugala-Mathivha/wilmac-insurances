import React from 'react';

export enum InsuranceType {
  AUTO = 'Auto',
  HOME = 'Home',
  LIFE = 'Life',
  BUSINESS = 'Business'
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}