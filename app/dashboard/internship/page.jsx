import InternshipList from '@/app/components/InternshipList';
import { getInternship } from '@/app/request/Request';  
import Link from 'next/link';

const Page = async () => {
  const internships = await getInternship(); 

  return (
    <div className="p-10">
        {/* <div className="p-5 border-b">
          <Link href={'/dashboard/internship/add'}>
            <button className="add">
              <p className='px-5 py-1'>เพิ่มข้อมูลนักศึกษา</p>
            </button>
          </Link>
        </div> */}
        <InternshipList internships={internships} />
      </div>
  );
};

export default Page;
