/**
 * Site-wide constants — single source of truth for all content
 */

export const COMPANY = {
  name: 'Lexora Tech',
  tagline: 'Building With Bits',
  headline: 'Creative Design Tech',
  description: 'Pioneering creative excellence in UI/UX, Web Development, and Digital Marketing. We transform ideas into masterpieces.',
  email: {
    contact: 'contact@lexoratech.com',
    info: 'info@lexoratech.com',
  },
  phone: {
    office: '+94 (71) 178 45 12',
    support: '+94 (72) 058 10 42',
  },
  address: {
    city: 'Gampaha Town',
    country: 'Sri Lanka',
    zip: '11000',
  },
  workspace: 'https://apps.lexoratech.com',
  copyright: `©${new Date().getFullYear()} Lexora Tech. All Rights Reserved`,
};

export const SOCIALS = [
  { name: 'Facebook', url: 'https://www.facebook.com/people/Lexora Tech/61573037507493/', icon: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/lexora_tech/', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/Lexora Tech', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCA-NVZ5FieP8uE1nYyfhRSw', icon: 'youtube' },
];

export const SERVICES = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Design of intuitive and visually appealing user interfaces for web and mobile applications, focusing on enhancing the user experience and usability.',
    icon: '🎨',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'brand',
    title: 'Brand Strategy',
    description: 'Comprehensive brand development, including logo creation, color scheme selection, and visual style design to ensure a cohesive and memorable brand identity.',
    icon: '💎',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'marketing',
    title: 'Marketing & SMM',
    description: 'Creation of impactful advertising campaigns and marketing materials designed to increase brand visibility, engage target audiences, and drive customer acquisition.',
    icon: '📈',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Development of responsive and high-performance websites and web applications, focusing on clean code, scalability, and seamless functionality.',
    icon: '🌐',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Design and development of responsive and feature-rich mobile applications for iOS and Android, focusing on seamless performance and engaging user experience.',
    icon: '📱',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'pos',
    title: 'POS Software',
    description: 'Design and development of reliable and efficient POS software applications, focusing on streamlined transaction processing and robust functionality.',
    icon: '🖥️',
    gradient: 'from-indigo-500 to-blue-600',
  },
];

export const STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 25, suffix: '+', label: 'Unique Customers' },
  { value: 100, suffix: '+', label: 'Completed Projects' },
];

export const REVIEWS = [
  {
    id: 1,
    project: 'Missed Lesson Project',
    client: 'Maga Harunu Paadama',
    url: 'https://magaharunupaadama.com',
    avatar: '/assets/reviews/cl1.png',
    review: 'I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions.',
  },
  {
    id: 2,
    project: "Sri Lanka's First EAP Service Project",
    client: 'Inner Mental Wellness',
    url: 'https://innermentalwellness.com/',
    avatar: '/assets/reviews/cl2.png',
    review: "I had the pleasure of working with Inner Mental Wellness, and I must say, they truly exceeded my expectations. Their professionalism, empathy, and innovative approach to mental health support are remarkable. They genuinely care about their clients' well-being and deliver meaningful, impactful solutions. I highly recommend them for their dedication and compassionate service.",
  },
];

export const NAV_LINKS = [
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/portfolio' },
  { label: 'Live Demos', path: '/live-demos' },
  { label: 'Blog', path: '/blog' },
  { label: 'About Us', path: '/about' },
];

export const ICON_BOXES = [
  {
    title: 'Expert Team',
    description: 'Our Team Is Made Up Of Seasoned Professionals Driven By Passion, Dedicated To Delivering Outstanding, High-Quality Projects.',
    icon: '🏆',
  },
  {
    title: 'Innovative Solutions',
    description: 'We Provide Innovative And Creative Solutions That Empower Your Business To Stand Out In The Market And Achieve Lasting Success.',
    icon: '💡',
  },
  {
    title: 'Client Focus',
    description: 'We Prioritize Client Needs, Deeply Understanding Them To Create Tailored Solutions For Maximum Results.',
    icon: '🎯',
  },
];

export const BUDGET_OPTIONS = [
  { value: '<1k', label: 'Less than $1k' },
  { value: '1k-5k', label: '$1k - $5k' },
  { value: '5k-10k', label: '$5k - $10k' },
  { value: '10k-25k', label: '$10k - $25k' },
  { value: '25k+', label: '$25k +' },
  { value: 'TBD', label: 'To Be Discussed' },
];

export const QUOTE_SERVICES = {
  web: {
    title: 'Web Development',
    options: ['Front-End Development', 'Back-End Development', 'E-commerce Development', 'Web Maintenance'],
    otherField: 'web_other',
  },
  mobile: {
    title: 'Mobile Development',
    options: ['iOS App', 'Android App', 'Cross-Platform', 'App Maintenance'],
    otherField: 'mobile_other',
  },
  pos: {
    title: 'POS Development',
    options: ['Retail POS', 'Restaurant POS', 'Inventory Mgmt', 'POS Support'],
    otherField: 'pos_other',
  },
  uiux: {
    title: 'UI/UX Design',
    options: ['User Research', 'Wireframing', 'Visual Design', 'Interaction Design'],
    otherField: 'ui_other',
  },
  brand: {
    title: 'Brand Strategy',
    options: ['Brand Positioning', 'Brand Identity', 'Brand Experience', 'Brand Communication'],
    otherField: 'brand_other',
  },
  marketing: {
    title: 'Marketing & SMM',
    options: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Paid Advertising'],
    otherField: 'marketing_other',
  },
};
