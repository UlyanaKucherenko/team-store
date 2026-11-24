import type { AboutSection, TeamSection } from '../types/types.js';

export const aboutIntro: AboutSection = {
  title: 'Welcome to MAROON',
  paragraphs: [
    'MAROON is an online flower and plant shop created for people who appreciate natural beauty, calm aesthetics, and comfort in everyday life.',
    'Our store brings together fresh flower bouquets, elegant floral arrangements, and lush indoor plants. Whether you want to surprise someone special, celebrate a meaningful moment, or bring warm, organic tones into your home, we are here to help you find something truly special.',
    'We believe that flowers express deep emotions, plants bring serene life into a space, and even the smallest details can transform the atmosphere around you.',
    'MAROON — Bring nature and warmth into your life.',
  ],
};

export const ourTeam: TeamSection = {
  title: 'Meet Our Team',
  intro:
    'Behind MAROON is a small, dedicated team working together to create a seamless, inspiring, and enjoyable online shopping experience.',
  members: [
    {
      name: 'Kseniya',
      role: 'Frontend Developer',
      tasks: [
        'Developed the product filtering system.',
        'Implemented product sorting.',
        'Worked on the product catalog and product cards.',
        'Prepared product data.',
        'Implemented filter state persistence.',
        'Created the styling and responsive layout.',
        'Implemented stock control for product availability.',
      ],
    },
    {
      name: 'Uliana',
      role: 'Frontend Developer',
      tasks: [
        'Set up the project structure and repository.',
        'Developed the navigation between pages.',
        'Implemented shopping cart functionality.',
        'Connected the product catalog with the cart.',
        'Worked on the shopping cart page.',
        'Implemented promotional code functionality.',
        'Implemented shopping cart persistence.',
        'Displayed the current number of items in the cart next to the cart link in the site header.',
      ],
    },
  ],
  outro:
    'We collaborated closely on the product catalog and interface design to create a smooth, intuitive, and welcoming shopping experience.',
};
