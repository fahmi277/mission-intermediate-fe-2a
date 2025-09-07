import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';

type TutorCardProps = {
  name: string;
  title: string;
  description: string;
  company?: string;
  avatar?: string;
};

const TutorCard: React.FC<TutorCardProps> = ({ name, title, description, company }) => {
  // Generate random avatar if none provided
  const getRandomAvatar = () => {
    const avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const randomIndex = Math.floor(Math.random() * avatarNumbers.length);
    return `../images/avatar/avatar${avatarNumbers[randomIndex]}.png`;
  };

  const displayAvatar =getRandomAvatar();

  return (
    console.log(displayAvatar),
    
    <div className="bg-white rounded-lg shadow-md p-6 text-[#333]">
      <div className='flex items-center mb-4 gap-4'>
        <img

          src={displayAvatar}
          alt={name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className='flex flex-row items-center'>
            <p className="text-sm text-gray-600">{title} di <span className="font-semibold text-gray-800">{company}</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-[14px] text-justify leading-relaxed">{description}</p>
    </div>
  );
};

type TutorProfileProps = {
  courseId?: string; // Optional prop to pass specific course ID
};

const TutorProfile: React.FC<TutorProfileProps> = ({ courseId }) => {
  const { id } = useParams<{ id: string }>();
  const { actions: { getCourseById } } = useCourses();
  
  // Get course data - use courseId prop if provided, otherwise use from URL params
  const targetCourseId = courseId || id;
  const course = targetCourseId ? getCourseById(targetCourseId) : null;

  // Generate random avatar for default tutor
  const getRandomAvatar = () => {
    const avatarNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const randomIndex = Math.floor(Math.random() * avatarNumbers.length);
    return `../images/avatar/avatar${avatarNumbers[randomIndex]}.png`;
  };

  // Generate different random tutor data
  const generateRandomTutor = () => {
    const names = [
      'Gregorius Edrik Lawanto',
      'Sari Indrawati',
      'Budi Santoso',
      'Maya Putri',
      'Andi Rahman'
    ];
    const jobs = [
      'Senior Talent Acquisition',
      'UI/UX Designer',
      'Product Manager',
      'Software Engineer',
      'Marketing Specialist'
    ];
    const companies = [
      'PT Wings Group',
      'Tokopedia',
      'Gojek',
      'Shopee',
      'Bukalapak'
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];

    return {
      name: randomName,
      title: randomJob,
      description: `Profesional berpengalaman di bidang ${randomJob.toLowerCase()}. Telah bekerja di berbagai perusahaan teknologi terkemuka dan berpengalaman dalam mengajar serta mentoring.`,
      company: randomCompany,
      avatar: "../images/avatar/avatar1.png"
    };
  };

  // Use course instructor data if available, otherwise use default
  const tutorInfo = course ? {
    name: course.instructor.name,
    title: course.instructor.job,
    description: `Instruktur berpengalaman dengan rating ${course.rating}/5 dari ${course.reviewCount} review. Bergabung dengan course ini untuk belajar langsung dari ahlinya.`,
    company: course.instructor.company,
    avatar: course.instructor.avatar
  } : {
    name: 'Gregorius Edrik Lawanto',
    title: 'Senior Talent Acquisition',
    description: 'Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.',
    company: 'PT Wings Group',
    avatar: getRandomAvatar()
  };

  // Generate second random tutor for variety
  const secondTutor = course ? tutorInfo : generateRandomTutor();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-[#333] w-full md:max-h-[600px] mt-4">
      <div className="">
        <h2 className="text-[18px] font-semibold mb-6">Belajar bersama Tutor Profesional</h2>
        <div className='flex flex-col lg:flex-row gap-4'>
          <TutorCard {...tutorInfo} />
          {/* Show different tutor for variety */}
          <TutorCard {...secondTutor} />
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;