import StudentList from '@/app/components/StudentList';
import { getStudent } from '@/app/request/Request';

const Page = async () => {
  const students = await getStudent();

  return (
    <div>
      <div className="p-10">
        <StudentList students={students} />
      </div>
    </div>
  );
};

export default Page;
