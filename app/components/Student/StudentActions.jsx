'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';

export const deleteStudent = async (id) => {
    const router = useRouter();
    try {
        await axios.delete(`/api/student/${id}`);
        router.refresh();  // รีเฟรชข้อมูลหลังจากลบสำเร็จ
    } catch (error) {
        console.log('error', error);
    }
};
