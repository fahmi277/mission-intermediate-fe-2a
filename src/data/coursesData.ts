import type { Course } from "../types/course";

export const coursesData: Course[] = [
  {
    id: "1",
    title: "Big 4 Auditor Financial Analyst",
    instructor: {
      name: "Jenna Ortega",
      job: "Senior Accountant",
      company: "Harisenin",
      avatar: "images/avatar/avatar1.png"
    },
    price: {
      current: 250000,
      original: 500000,
      discount: 50
    },
    rating: 4.5,
    reviewCount: 120,
    category: "Bisnis Manajemen",
    duration: "8 jam",
    image: "images/auditor_financial_analyst.jpg",
    description: "Pelajari keterampilan analisis finansial yang digunakan di perusahaan Big 4. Course ini mencakup fundamental accounting, financial modeling, dan praktik audit modern."
  },
  {
    id: "2",
    title: "Digital Marketing Strategy",
    instructor: {
      name: "Emma Stone",
      job: "Marketing Director",
      company: "Harisenin",
      avatar: "images/avatar/avatar2.png"
    },
    price: {
      current: 300000,
      original: 450000,
      discount: 33
    },
    rating: 4.8,
    reviewCount: 89,
    category: "Pemasaran",
    duration: "6 jam",
    image: "images/auditor_financial_analyst_2.jpg",
    description: "Kuasai strategi pemasaran digital terkini, mulai dari SEO, SEM, social media marketing, hingga analytics."
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: {
      name: "Ryan Gosling",
      job: "Senior Designer",
      company: "Harisenin",
      avatar: "images/avatar/avatar3.png"
    },
    price: {
      current: 200000,
      original: 350000,
      discount: 43
    },
    rating: 4.7,
    reviewCount: 156,
    category: "Digital & Teknologi",
    duration: "10 jam",
    image: "images/auditor_financial_analyst_3.jpg",
    description: "Pelajari prinsip-prinsip desain UI/UX, user research, prototyping, dan tools design modern seperti Figma."
  },
  {
    id: "4",
    title: "Personal Branding & Leadership",
    instructor: {
      name: "Scarlett Johansson",
      job: "Leadership Coach",
      company: "Harisenin",
      avatar: "images/avatar/avatar4.png"
    },
    price: {
      current: 180000,
      original: 280000,
      discount: 36
    },
    rating: 4.6,
    reviewCount: 203,
    category: "Pengembangan Diri",
    duration: "5 jam",
    image: "images/auditor_financial_analyst_4.jpg",
    description: "Bangun personal branding yang kuat dan kembangkan kemampuan leadership untuk karir yang lebih baik."
  },
  {
    id: "5",
    title: "Data Science with Python",
    instructor: {
      name: "Robert Downey Jr",
      job: "Data Scientist",
      company: "Harisenin",
      avatar: "images/avatar/avatar5.png"
    },
    price: {
      current: 400000,
      original: 600000,
      discount: 33
    },
    rating: 4.9,
    reviewCount: 78,
    category: "Digital & Teknologi",
    duration: "12 jam",
    image: "images/auditor_financial_analyst_5.jpg",
    description: "Kuasai data science dengan Python, mulai dari data analysis, visualization, hingga machine learning basics."
  },
  {
    id: "6",
    title: "Project Management Professional",
    instructor: {
      name: "Chris Evans",
      job: "Project Manager",
      company: "Harisenin",
      avatar: "images/avatar/avatar6.png"
    },
    price: {
      current: 350000,
      original: 500000,
      discount: 30
    },
    rating: 4.4,
    reviewCount: 134,
    category: "Bisnis Manajemen",
    duration: "9 jam",
    image: "images/auditor_financial_analyst_6.jpg",
    description: "Pelajari metodologi project management modern, tools, dan best practices untuk mengelola project dengan efektif."
  },
  {
    id: "7",
    title: "Content Creation Masterclass",
    instructor: {
      name: "Zendaya Coleman",
      job: "Content Creator",
      company: "Harisenin",
      avatar: "images/avatar/avatar7.png"
    },
    price: {
      current: 220000,
      original: 320000,
      discount: 31
    },
    rating: 4.5,
    reviewCount: 167,
    category: "Pemasaran",
    duration: "7 jam",
    image: "images/auditor_financial_analyst_7.jpg",
    description: "Belajar membuat konten yang engaging untuk berbagai platform, teknik storytelling, dan content strategy."
  },
  {
    id: "8",
    title: "Financial Planning & Investment",
    instructor: {
      name: "Tom Holland",
      job: "Financial Advisor",
      company: "Harisenin",
      avatar: "images/avatar/avatar8.png"
    },
    price: {
      current: 280000,
      original: 400000,
      discount: 30
    },
    rating: 4.3,
    reviewCount: 92,
    category: "Bisnis Manajemen",
    duration: "6 jam",
    image: "images/auditor_financial_analyst_8.jpg",
    description: "Kuasai perencanaan keuangan personal, investasi, dan strategi untuk mencapai financial freedom."
  }
];

// Filter options data
export const filterOptions = {
  bidangStudi: [
    "Pemasaran",
    "Digital & Teknologi", 
    "Pengembangan Diri",
    "Bisnis Manajemen"
  ],
  harga: [
    "Gratis",
    "< Rp100.000",
    "Rp100.000 – Rp500.000", 
    "> Rp500.000"
  ],
  durasi: [
    "Kurang dari 4 Jam",
    "4 – 8 Jam",
    "Lebih dari 8 Jam"
  ]
};
