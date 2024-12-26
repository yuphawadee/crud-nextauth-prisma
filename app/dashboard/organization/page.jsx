// import OrganizationList from '@/app/components/organizationList';
import OrganizationList from '@/app/components/Organization/OrganizationList';
import { getOrganization } from '@/app/request/Request';
import Link from 'next/link';

const Page = async () => {
  const organizations = await getOrganization(); 

  return (
    <div className="">
      <div className="p-10">
        {/* <div className="p-5 border-b">
          <Link href={'/dashboard/organization/add'}>
            <button className="add">
              <p className='px-5 py-1'>เพิ่มข้อมูลนักศึกษา</p>
            </button>
          </Link>
        </div> */}
        <OrganizationList organizations={organizations} />
      </div>
    </div>
  );
};

export default Page;
